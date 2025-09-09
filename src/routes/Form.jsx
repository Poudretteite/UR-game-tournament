import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import assets from '../data/assets.json';
import Button from '../components/Button';
import links from '../data/links.json';
import { validateForm } from "../../netlify/functions/validateForm.js";

const shirtSizes = ["S", "M", "L", "XL"];
const date2007 = "2007-08-06";

function Form() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.target);
    const rawData = Object.fromEntries(formData.entries());

    const members = [];
    for (let i = 1; i <= 6; i++) {
      const prefix = `teamMember${i}`;
      const firstName = rawData[`${prefix}Name`]?.trim() || '';
      const lastName  = rawData[`${prefix}LastName`]?.trim() || '';
      const steam = rawData[`${prefix}Steam`]?.trim() || '';
      const faceit = rawData[`${prefix}Faceit`]?.trim() || '';
      const birthDate = rawData[`${prefix}birthDate`] || '';
      const shirtSize = rawData[`${prefix}shirtSize`] || '';

      const isOptional = i === 6;
      const isEmpty = !firstName && !lastName && !steam && !birthDate && !shirtSize;
      if (isOptional && isEmpty) {
        continue;
      }

      members.push({ firstName, lastName, steam, faceit, birthDate, shirtSize });
    }

    const data = {
      team: {
        captainName: rawData.name.trim(),
        captainTel: rawData.telephone.trim(),
        captainEmail: rawData.email.trim(),
        teamName: rawData.teamName.trim()
      },
      members
    }

    const validationError = validateForm(data);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const res = await fetch("/.netlify/functions/registerTeam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      const text = await res.text(); // now this is the actual string
  
      if (!res.ok) {
        throw new Error(text || "Błąd serwera!");
      }
  
      navigate("/thankyou");
    } catch (err) {
      console.error(err);
      setError(err.message || "Coś poszło nie tak!");
    }
  };

  const commonStyle =
    "focus:border-blue-500 border border-[#1952ff] p-4 border- bg-[#080e0e8f] text-white w-full italic h-14";

  return (
    <main className="max-w-4xl mx-auto text-white">
      <img src={assets.logo_text} alt="logo" className="-mt-28 -mb-28 h-[6rem] md:h-[13rem] mx-auto hidden md:block drop-shadow-[0_0_20px_#1952ff]" />
      <form onSubmit={handleSubmit} className="flex flex-col py-10 md:pt-32 mb-10 space-y-6 p-6 h-a bg-black bg-opacity-30 rounded-2xl shadow-[inset_2px_2px_15px_#1952ff]">
      <h1 className="text-5xl font-bold text-center text-white mb-6 pt-3">REJESTRACJA</h1>
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
                  {
                    optional
                      ? "Zawodnik rezerwowy (opcjonalnie)"
                      : i != 0
                        ? `Zawodnik ${i + 1}`
                        : `Zawodnik ${i + 1} Kapitan`
                  }
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
                    Link do profilu Faceit
                    <input
                      type="url"
                      name={`${tmNo}Faceit`}
                      placeholder="Link"
                      required={required}
                      className={commonStyle}
                      pattern="https:\/\/www\.faceit\.com\/[a-z]{2}\/players\/[A-Za-z0-9_.\-]+\/?"
                      title="Link musi być w formacie https://www.faceit.com/en/players/<username>"
                    />
                  </label>

                  <label className="block text-lg mt-2 pt-3">
                    Data urodzenia
                    <input
                      type="date"
                      max={date2007}
                      name={`${tmNo}birthDate`}
                      required={required}
                      className={`${commonStyle} py-1`}
                    />
                  </label>

                  <label className="block text-lg mt-2 pt-3">
                    Rozmiar koszulki
                    <select
                      name={`${tmNo}shirtSize`}
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
          <div className='flex flex-col mb-10 space-y-6 p-6 h-a bg-black bg-opacity-70 text-center border border-[#1952ff]'>
            <h2 className="font-bold text-4xl mb-2">BŁĄD</h2>
            <p className='text-xl'>{error}</p>
            <button onClick={() => setError('')} className="py-2 bg-black m-auto border border-white w-32">
              Zamknij
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Form;
