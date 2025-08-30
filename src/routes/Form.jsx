import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import assets from '../data/assets.json';
import Button from '../components/Button';
import links from '../data/links.json';

function Form() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

//  -------- Usunąć po testach ---------
//  ____________________________________
    console.log("Wysyłany JSON:", data);
//  ____________________________________

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
  const shirtSizes = ["S", "M", "L", "XL"];
  const date2007 = "2007-08-06";

  return (
    <main className="prose max-w-3xl m-auto p-6 bg-gray-800 text-white">
      <h1 className="text-4xl font-bold text-center mb-6 pt-3">REJESTRACJA</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="form-name" value="contact" />

        <div>
          <label htmlFor="name" className="block mb-1">
            IMIĘ I NAZWISKO KAPITANA
          </label>
          <input type="text" id="name" name="name" placeholder="Imię" required className={commonStyle} />
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
            minLength="9"
            maxLength="9"
            required
            className={commonStyle}
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1">
            ADRES E-MAIL KAPITANA
          </label>
          <input type="email" id="email" name="email" placeholder="Email" required className={commonStyle} />
        </div>

        <div>
          <label htmlFor="teamName" className="block mb-1">
            NAZWA DRUŻYNY
          </label>
          <input type="text" id="teamName" name="teamName" placeholder="Nazwa Drużyny" required className={commonStyle} />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => {
              const optional = i === 5;
              const tmNo = "teamMember" + (i + 1);
              const required = !optional;

              return (
                <div key={i} className="p-5 pt-10">
                  <h3 className=" text-3xl h-16 font-semibold">{optional ? "Zawodnik rezerwowy (opcjonalnie)" : `Zawodnik ${i + 1}`}</h3>

                  <label className="block text-lg mt-2 pt-3">
                    Imię
                    <input type="text" name={tmNo + "Name"} placeholder="Imię" required={required} className={commonStyle} />
                  </label>

                  <label className="block text-lg mt-2 pt-3">
                    Nazwisko
                    <input type="text" name={tmNo + "LastName"} placeholder="Nazwisko" required={required} className={commonStyle} />
                  </label>

                  <label className="block text-lg mt-2 pt-3">
                    Link do profilu Steam
                    <input type="url" name={tmNo + "Steam"} placeholder="Link" required={required} className={commonStyle} pattern='https://steamcommunity.com/profiles/7656\d{13}$'/>
                  </label>

                  <label className="block text-lg mt-2 pt-3">
                    Data urodzenia
                    <input type="date" max={date2007} name={tmNo + "BirthDate"} required={required} className={commonStyle + " py-1"} />
                  </label>

                  <label className="block text-lg mt-2 pt-3">
                    Rozmiar koszulki
                    <select name={tmNo + "ShirtSize"} defaultValue="M" required={required} className={commonStyle + " mt-1"}>
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

        <div className="flex-row space-y-4 mt-4">
          <label className="flex items-center">
            <input type="checkbox" required className="mr-2 w-6 h-6 shrink-0" />
            <p>Oświadczam, że zapoznałem/am się z <Link to={links.Rules} target="_blank" className='underline'> Regulaminem Turnieju "{assets.name}" </Link> organizowanego przez Uniwersytet Rzeszowski, akceptuję jego postanowienia oraz zobowiązuję się do przekazania jego treści pozostałym członkom Drużyny.</p>
          </label>

          <label className="flex items-center">
            <input type="checkbox" required className="mr-2 w-6 h-6 shrink-0" />
            <p>Oświadczam, że zapoznałem/am się z <Link to="/gdpr" className="underline">klauzulą informacyjną</Link> dotyczącą ochrony danych osobowych.</p>
          </label>
        </div>

        <div className='form-submit my-0'>
            <Button value="submitMessage" type='submit' >Zarejestruj</Button>
        </div>
      </form>

      {error && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-red-700 p-6 rounded max-w-md w-full text-center">
            <h2 className=" font-bold mb-2">Error</h2>
            <p className="">{error}</p>
            <button onClick={() => setError("")} className="px-4 py-2 bg-black rounded">
              Zamknij
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Form;
