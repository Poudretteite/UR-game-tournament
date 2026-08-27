import { Pool } from "pg";
import { validateForm } from "./validateForm.js";
import { rateLimit } from "./rateLimit.js";
import nodemailer from 'nodemailer';

const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const REGISTRATION_DEADLINE = new Date("2026-09-13T23:59:59+02:00").getTime();

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Niedozwolona metoda." };
    }

    const rawIp = event.headers['x-forwarded-for'] || event.headers['X-Forwarded-For'] || event.ip || 'unknown';
    const ip = rawIp.split(',')[0].trim();

    if (rateLimit(ip)) {
        return { statusCode: 429, body: "Za dużo żądań. Spróbuj ponownie później." };
    }

    if (Date.now() > REGISTRATION_DEADLINE) {
        return { statusCode: 400, body: "Zapisy do turnieju zostały zakończone (termin minął 13.09.2026 o 23:59)." };
    }

    if (!event.body || event.body.length > 100000) {
        return { statusCode: 400, body: "Niepoprawne lub zbyt duże żądanie." };
    }

    let data;
    try {
        data = JSON.parse(event.body);
    } catch {
        return { statusCode: 400, body: "Niepoprawny format danych JSON." };
    }

    // Ochrona przed botami (honeypot)
    if (data.hp_field) {
        return { statusCode: 200, body: "Rejestracja zakończona sukcesem." };
    }

    const validationError = validateForm(data);
    if (validationError) {
        return { statusCode: 400, body: validationError };
    }
    
    const { team, members } = data;
    const client = await pool.connect();
    let memberNum = 1;

    try {
        await client.query("BEGIN");

        const result = await client.query(
            `INSERT INTO Teams (TeamName, CaptainName, CaptainTel, CaptainEmail) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [team.teamName.trim(), team.captainName.trim(), team.captainTel.trim(), team.captainEmail.trim()]
        );
        const teamId = result.rows[0].id;

        const realMembers = members.filter(m =>
            m.firstName || m.lastName || m.steam
        );

        for (let i = 0; i < realMembers.length; i++) {
            memberNum = i + 1; 
            const member = realMembers[i];
            const { firstName, lastName, steam, birthDate, shirtSize } = member;

            await client.query(
                `INSERT INTO Players (Name, Surname, Steam, birthDate, ShirtSize, Team_id) 
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [firstName.trim(), lastName.trim(), steam.trim(), birthDate, shirtSize, teamId]
            );
        }

        await client.query("COMMIT");
    } catch (err) {
        await client.query("ROLLBACK");

        if (err.code === '23505') {
            switch (err.constraint) {
                case 'teams_teamname_key':
                  return { statusCode: 400, body: 'Nazwa drużyny jest już zajęta.' };
                case 'teams_captainemail_key':
                  return { statusCode: 400, body: 'Email kapitana jest już zarejestrowany.' };
                case 'players_steam_key':
                  return { statusCode: 400, body: `Link Steam zawodnika ${memberNum} jest już zarejestrowany.` };
                default:
                  return { statusCode: 400, body: 'Podane dane (nazwa drużyny, email lub link Steam) są już w bazie.' };
            }
        }

        console.error("Błąd serwera podczas rejestracji:", err);
        return { statusCode: 500, body: "Wystąpił błąd serwera podczas przetwarzania rejestracji. Spróbuj ponownie później." };
    } finally {
        client.release();
    }

    try {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const realMembers = members.filter(m => m.firstName || m.lastName || m.steam);
            const memberList = realMembers.map(
                (m, i) => `
                    <p>
                        <strong>Zawodnik ${i + 1}:</strong><br>
                        Imię: ${escapeHtml(m.firstName)} ${escapeHtml(m.lastName)}<br>
                        Steam: <a href="${escapeHtml(m.steam)}">${escapeHtml(m.steam)}</a><br>
                        Data urodzenia: ${escapeHtml(m.birthDate)}<br>
                    </p>
                `
            ).join('');

            const htmlContent = `
                <h2>Drużyna: ${escapeHtml(team.teamName)}</h2>
                <p><strong>Kapitan:</strong> ${escapeHtml(team.captainName)}</p>
                <p><strong>Telefon:</strong> ${escapeHtml(team.captainTel)}</p>
                <p><strong>Email:</strong> ${escapeHtml(team.captainEmail)}</p>
                <h3>Zawodnicy:</h3>
                ${memberList}
            `;

            const mailPromises = [];
            if (process.env.ORGANIZER_EMAIL) {
                mailPromises.push(
                    transporter.sendMail({
                        from: `"Rejestracja do turnieju" <${process.env.EMAIL_USER}>`,
                        to: process.env.ORGANIZER_EMAIL,
                        subject: `Nowa rejestracja: ${escapeHtml(team.teamName)}`,
                        html: htmlContent,
                    })
                );
            }

            mailPromises.push(
                transporter.sendMail({
                    from: `"Rejestracja do turnieju" <${process.env.EMAIL_USER}>`,
                    to: team.captainEmail,
                    subject: `Dziękujemy za rejestrację: ${escapeHtml(team.teamName)}`,
                    html: htmlContent,
                })
            );

            await Promise.all(mailPromises);
        }
    } catch (emailErr) {
        console.error("Błąd podczas wysyłania e-maila:", emailErr);
        return { statusCode: 200, body: "Rejestracja udana, ale wystąpił problem z wysłaniem e-maila potwierdzającego." };
    }

    return { statusCode: 200, body: "Rejestracja zakończona sukcesem." };
}