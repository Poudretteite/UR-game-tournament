import { Pool } from "pg";
import { validateForm } from "./validateForm.js";
import { rateLimit } from "./rateLimit.js";
import nodemailer from 'nodemailer';


const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export async function handler(event) {
    const ip = event.headers['x-forwarded-for'] || event.ip || 'unknown';

    if (rateLimit(ip)) {
        return { statusCode: 429, body: "Za dużo żądań. Spróbuj ponownie później." };
    }
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Niedozwolona metoda." };
    }
    
    let data;
    try {
        data = JSON.parse(event.body);
    } catch {
        return { statusCode: 400, body: "niepoprawny JSON" };
    }

    const validationError = validateForm(data);
    if (validationError) {
        return { statusCode: 400, body: validationError };
    }
    
    const { team, members } = data;

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const result = await client.query(
            `INSERT INTO Teams (TeamName, CaptainName, CaptainTel, CaptainEmail) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [team.teamName, team.captainName, team.captainTel, team.captainEmail]
        );
        const teamId = result.rows[0].id;

        const realMembers = members.filter(m =>
            m.firstName || m.lastName || m.steam
        );
        let memberNum = 1;

        for (const member of realMembers) {
            const { firstName, lastName, steam, faceit, birthDate, shirtSize } = member;
            await client.query(
                `INSERT INTO Players (Name, Surname, Steam, Faceit, birthDate, ShirtSize, Team_id) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [firstName, lastName, steam, faceit, birthDate, shirtSize, teamId]
            );
            memberNum++;
        }

        await client.query("COMMIT");

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const memberList = realMembers.map(
            (m, i) => `
                <p>
                    <strong>Zawodnik ${i + 1}:</strong><br>
                    Imię: ${m.firstName} ${m.lastName}<br>
                    Steam: <a href="${m.steam}">${m.steam}</a><br>
                    Faceit: <a href="${m.faceit}">${m.faceit}</a><br>
                    Data urodzenia: ${m.birthDate}<br>
                </p>
            `
        ).join('');

        await transporter.sendMail({
            from: `"Rejestracja do turnieju" ${process.env.EMAIL_USER}`,
            to: process.env.ORGANIZER_EMAIL1,
            subject: `Nowa rejestracja: ${team.teamName}`,
            html: `
                <h2>Drużyna: ${team.teamName}</h2>
                <p><strong>Kapitan:</strong> ${team.captainName}</p>
                <p><strong>Telefon:</strong> ${team.captainTel}</p>
                <p><strong>Email:</strong> ${team.captainEmail}</p>
                <h3>Zawodnicy:</h3>
                ${memberList}
            `,
        });

        await transporter.sendMail({
            from: `"Rejestracja do turnieju" ${process.env.EMAIL_USER}`,
            to: process.env.ORGANIZER_EMAIL2,
            subject: `Nowa rejestracja: ${team.teamName}`,
            html: `
                <h2>Drużyna: ${team.teamName}</h2>
                <p><strong>Kapitan:</strong> ${team.captainName}</p>
                <p><strong>Telefon:</strong> ${team.captainTel}</p>
                <p><strong>Email:</strong> ${team.captainEmail}</p>
                <h3>Zawodnicy:</h3>
                ${memberList}
            `,
        });

        await transporter.sendMail({
            from: `"Rejestracja do turnieju" ${process.env.EMAIL_USER}`,
            to: team.captainEmail,
            subject: `Dziekujemy za rejestrację: ${team.teamName}`,
            html: `
                <h2>Drużyna: ${team.teamName}</h2>
                <p><strong>Kapitan:</strong> ${team.captainName}</p>
                <p><strong>Telefon:</strong> ${team.captainTel}</p>
                <p><strong>Email:</strong> ${team.captainEmail}</p>
                <h3>Zawodnicy:</h3>
                ${memberList}
            `,
        });

        return { statusCode: 200, body: "Rejestracja zakończona sukcesem." };

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
                case 'players_faceit_key':
                  return { statusCode: 400, body: `Link FACEIT zawodnika ${memberNum} jest już zarejestrowany.` };
                default:
                  return { statusCode: 400, body: err.detail || err.message };
            }
        }

        console.error("Błąd serwera:", err);
        return { statusCode: 500, body: "Błąd serwera: " + err.message };
    } finally {
        client.release();
    }
}
