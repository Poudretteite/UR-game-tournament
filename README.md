# GameX ToURnament

Strona internetowa **GameX ToURnament** — ogólnopolskiego turnieju e-sportowego w Counter-Strike 2, organizowanego przez Samorząd Studentów Uniwersytetu Rzeszowskiego.

<img width="1840" height="877" alt="image" src="https://github.com/user-attachments/assets/ab7b08c9-52fb-4ec4-a995-cb64f5515491" />


🌐 **Wersja produkcyjna:** [gamex-tournament.netlify.app](https://gamex-tournament.netlify.app/)

## Funkcje

- Strona główna z informacjami o turnieju, nagrodach i partnerach
- Formularz rejestracji drużyn (5–6 zawodników, kapitan, rozmiary koszulek)
  - walidacja po stronie klienta i serwera (format danych, wiek 18+, filtr wulgaryzmów w nazwie drużyny)
  - limit żądań na adres IP i automatyczne zamknięcie zapisów po terminie
  - powiadomienia e-mail do kapitana i organizatora
- Galeria zdjęć z poprzednich edycji
- Osadzona transmisja Twitch
- Strony: informacje, kontakt, RODO, podziękowanie po rejestracji
- Chroniony kluczem eksport zgłoszeń do pliku Excel (dla organizatorów)

## Technologie

| Warstwa | Narzędzia |
|---|---|
| Frontend | React 19, Vite, React Router, Tailwind CSS, Motion, Three.js (`@react-three/fiber`) |
| Backend | Netlify Functions (Node.js) |
| Baza danych | PostgreSQL (Neon) przez `pg` |
| Inne | Nodemailer (Gmail), ExcelJS, bad-words |
| Hosting | Netlify |

## Struktura projektu

```
├── netlify/functions/     # funkcje serwerowe
│   ├── registerTeam.js    # zapis drużyny do bazy + e-maile
│   ├── getTeamData.js     # eksport zgłoszeń do .xlsx (wymaga klucza admina)
│   ├── validateForm.js    # walidacja danych formularza
│   └── rateLimit.js       # prosty limit żądań na IP
├── public/                # pliki statyczne (logotypy, favicon, sitemap, robots.txt)
├── src/
│   ├── components/        # nagłówek, stopka, sponsorzy, embed Twitch, komponenty UI
│   ├── routes/            # podstrony (Home, Info, Form, Gallery, Contact, Gdpr, ThankYou)
│   ├── data/              # linki i dane konfiguracyjne (np. regulamin)
│   ├── functions/         # walidacja po stronie klienta
│   ├── App.jsx            # układ strony
│   └── main.jsx           # routing
├── netlify.toml           # konfiguracja builda i nagłówków bezpieczeństwa
└── vite.config.js
```

## Uruchomienie lokalne

Wymagania: Node.js 20+ oraz npm.

```bash
git clone https://github.com/Poudretteite/UR-game-tournament.git
cd UR-game-tournament
npm install
npm run dev
```

Polecenie `npm run dev` uruchamia sam frontend. Aby lokalnie działały też funkcje serwerowe (rejestracja, eksport), użyj Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

## Zmienne środowiskowe

Utwórz plik `.env` w katalogu głównym (jest ignorowany przez git) albo ustaw zmienne w panelu Netlify:

| Zmienna | Opis |
|---|---|
| `NETLIFY_DATABASE_URL` | Connection string do bazy PostgreSQL |
| `EMAIL_USER` | Adres Gmail, z którego wysyłane są powiadomienia |
| `EMAIL_PASS` | Hasło aplikacji dla tego konta Gmail |
| `ORGANIZER_EMAIL` | Adres organizatora otrzymujący kopie zgłoszeń |
| `ADMIN_API_KEY` | Klucz do eksportu zgłoszeń (nagłówek `X-Admin-Token`) |

## Baza danych

Funkcje korzystają z dwóch tabel: `Teams` (nazwa drużyny i dane kapitana) oraz `Players` (zawodnicy powiązani z drużyną przez `Team_id`).

## Skrypty

| Polecenie | Działanie |
|---|---|
| `npm run dev` | serwer deweloperski Vite |
| `npm run build` | build produkcyjny do `dist/` |
| `npm run preview` | podgląd zbudowanej wersji |
| `npm run lint` | sprawdzenie kodu ESLintem |

## Wdrożenie

Projekt jest wdrażany na Netlify: build `npm run build`, katalog publikacji `dist`, funkcje z `netlify/functions`. Ustawienia oraz nagłówki bezpieczeństwa (CSP, HSTS itp.) są w `netlify.toml`.

## Kontekst edycji

Termin zapisów jest zapisany na sztywno w `netlify/functions/registerTeam.js` (`REGISTRATION_DEADLINE`) — przed kolejną edycją trzeba go zaktualizować, podobnie jak daty i treści na stronie głównej oraz link do regulaminu w `src/data/links.json`.
