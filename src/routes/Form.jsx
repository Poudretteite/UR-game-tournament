import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Filter} from 'bad-words';
import assets from '../data/assets.json';
import Button from '../components/Button';
import links from '../data/links.json';

const shirtSizes = ["S", "M", "L", "XL"];
const date2007 = "2007-08-06";

function Form() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const filter = new Filter();

  const validateForm = (data) => {
    // Kapitan
    if (!data.name?.trim() || data.name.trim().length < 2) {
      return 'Imię i nazwisko kapitana jest wymagane.';
    }
    if (filter.isProfane(data.name)) {
      return 'Imię kapitana zawiera niedozwolone słowa.';
    }

    // Telefon
    if (!/^\d{9}$/.test(data.telephone)) {
      return 'Numer telefonu musi mieć dokładnie 9 cyfr.';
    }

    // Email
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      return 'Niepoprawny adres email.';
    }

    // Nazwa drużyny
    if (!data.teamName?.trim() || data.teamName.trim().length < 2) {
      return 'Nazwa drużyny jest wymagana.';
    }
    if (filter.isProfane(data.teamName)) {
      return 'Nazwa drużyny zawiera niedozwolone słowa.';
    }

    // Zawodnicy
    for (let i = 1; i <= 6; i++) {
      const prefix = `teamMember${i}`;
      const optional = i === 6;

      const firstName = data[`${prefix}Name`]?.trim();
      const lastName  = data[`${prefix}LastName`]?.trim();
      const steam     = data[`${prefix}Steam`];
      const birthDate = data[`${prefix}BirthDate`];
      const shirtSize = data[`${prefix}ShirtSize`];

      // Pomijamy opcjonalnego rezerwowego, jeśli pola są puste
      if (optional && !firstName && !lastName && !steam) {
        continue;
      }

      if (!firstName || firstName.length < 2) {
        return `Imię zawodnika ${i} jest wymagane.`;
      }
      if (filter.isProfane(firstName)) {
        return `Imię zawodnika ${i} zawiera niedozwolone słowa.`;
      }

      if (!lastName || lastName.length < 2) {
        return `Nazwisko zawodnika ${i} jest wymagane.`;
      }
      if (filter.isProfane(lastName)) {
        return `Nazwisko zawodnika ${i} zawiera niedozwolone słowa.`;
      }

      if (!/^https:\/\/steamcommunity\.com\/profiles\/\d{17}\/?$/.test(steam)) {
        return `Link Steam zawodnika ${i} jest niepoprawny.`;
      }

      if (!birthDate || new Date(birthDate) > new Date(date2007)) {
        return `Zawodnik ${i} musi być urodzony przed ${date2007}.`;
      }

      if (!shirtSizes.includes(shirtSize)) {
        return `Niepoprawny rozmiar koszulki zawodnika ${i}.`;
      }
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

  if (
    !data.teamMember6Name?.trim() &&
    !data.teamMember6LastName?.trim() &&
    !data.teamMember6Steam?.trim()
  ) {
    data.teamMember6BirthDate = '';
    data.teamMember6ShirtSize  = '';
  }
console.log(data);
    const validationError = validateForm(data);
    if (validationError) {
      setError(validationError);
      return;
    }

    fetch("http://localhost:8080/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Błąd serwera");
        navigate("/thankyou");
      })
      .catch((err) => {
        console.error(err);
        setError(err.toString());
      });
  };

  const commonStyle =
    "focus:border-blue-500 border p-4 border-white bg-gray-800 text-white w-full italic h-14";

  return (
    <main className="prose max-w-3xl m-auto p-6 bg-gray-800 text-white">
      <h1 className="text-4xl font-bold text-center mb-6 pt-3">REJESTRACJA</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="form-name" value="contact" />

        {/* Kapitan */}
        <div>
          <label htmlFor="name" className="block mb-1">
            IMIĘ I NAZWISKO KAPITANA
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Imię i nazwisko"
            required
            className={commonStyle}
          />
        </div>

        <div>
          <label htmlFor="telephone" className="block mb-1">
            NUMER KONTAKTOWY KAPITANA
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            placeholder="123456789"
            pattern="[0-9]{9}"
            title="Numer telefonu musi składać się z 9 cyfr."
            required
            className={commonStyle}
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">
            ADRES E-MAIL KAPITANA
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            className={commonStyle}
          />
        </div>

        <div>
          <label htmlFor="teamName" className="block mb-1">
            NAZWA DRUŻYNY
          </label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            placeholder="Nazwa Drużyny"
            required
            className={commonStyle}
          />
        </div>

        {/* Zawodnicy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => {
              const optional = i === 5;
              const tmNo = `teamMember${i + 1}`;
              const required = !optional;

              return (
                <div key={i} className="p-5 pt-10">
                  <h3 className="text-3xl h-16 font-semibold">
                    {optional ? "Zawodnik rezerwowy (opcjonalnie)" : `Zawodnik ${i + 1}`}
                  </h3>

                  <label className="block text-lg mt-2 pt-3">
                    Imię
                    <input
                      type="text"
                      name={`${tmNo}Name`}
                      placeholder="Imię"
                      required={required}
                      className={commonStyle}
                    />
                  </label>

                  <label className="block text-lg mt-2 pt-3">
                    Nazwisko
                    <input
                      type="text"
                      name={`${tmNo}LastName`}
                      placeholder="Nazwisko"
                      required={required}
                      className={commonStyle}
                    />
                  </label>

                  <label className="block text-lg mt-2 pt-3">
                    Link do profilu Steam
                    <input
                      type="url"
                      name={`${tmNo}Steam`}
                      placeholder="Link"
                      required={required}
                      className={commonStyle}
                      pattern="^https://steamcommunity\.com/profiles/\d{17}/?$"
                      title="Link musi być w formacie https://steamcommunity.com/profiles/7656119XXXXXXXXXX/"
                    />
                  </label>

                  <label className="block text-lg mt-2 pt-3">
                    Data urodzenia
                    <input
                      type="date"
                      max={date2007}
                      name={`${tmNo}BirthDate`}
                      required={required}
                      className={`${commonStyle} py-1`}
                    />
                  </label>

                  <label className="block text-lg mt-2 pt-3">
                    Rozmiar koszulki
                    <select
                      name={`${tmNo}ShirtSize`}
                      defaultValue="M"
                      required={required}
                      className={`${commonStyle} mt-1`}
                    >
                      {shirtSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              );
            })}
        </section>

        {/* Oświadczenia */}
        <div className="flex-row space-y-4 mt-4">
          <label className="flex items-center">
            <input type="checkbox" required className="mr-2 w-6 h-6 shrink-0" />
            <p>
              Oświadczam, że zapoznałem/am się z{' '}
              <Link to={links.Rules} target="_blank" className="underline">
                Regulaminem Turnieju "{assets.name}"
              </Link>{' '}
              organizowanego przez Uniwersytet Rzeszowski, akceptuję jego postanowienia oraz zobowiązuję się do przekazania jego treści pozostałym członkom Drużyny.
            </p>
          </label>

          <label className="flex items-center">
            <input type="checkbox" required className="mr-2 w-6 h-6 shrink-0" />
            <p>
              Oświadczam, że zapoznałem/am się z{' '}
              <Link to="/gdpr" className="underline">
                klauzulą informacyjną
              </Link>{' '}
              dotyczącą ochrony danych osobowych.
            </p>
          </label>
        </div>

        <div className="form-submit my-0">
          <Button value="submitMessage" type="submit">
            Zarejestruj
          </Button>
        </div>
      </form>

      {error && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-red-700 p-6 rounded max-w-md w-full text-center">
            <h2 className="font-bold mb-2">Error</h2>
            <p>{error}</p>
            <button onClick={() => setError('')} className="px-4 py-2 bg-black rounded">
              Zamknij
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Form;
