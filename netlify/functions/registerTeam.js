import { Pool } from "pg";
import { validateForm } from "./validateForm.js";
import nodemailer from 'nodemailer';


const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Niedozwolona metoda." };
    }
    
    let data;
    try {
        data = JSON.parse(event.body);
    } catch {
        return { statusCode: 400, body: "Invalid JSON" };
    }

    const validationError = validateForm(data);
    if (validationError) {
        setError(validationError);
        return;
    }
    
    const { team, members } = data;

    if (!team || !team.teamName || !team.captainName || !team.captainTel || !team.captainEmail) {
        return { statusCode: 400, body: "Wypełnij wszystkie pola drużyny!" };
    }
    if (!Array.isArray(members) || members.length < 5 || members.length > 6) {
        return { statusCode: 400, body: "Wypełnij wszystkich zawodników!" };
    }

    for (let i = 0; i < members.length; i++) {
        const { firstName, lastName, steam, birthDate, shirtSize } = members[i];
        const isOptional = i === 5;
        const isEmpty = !firstName && !lastName && !steam;

        if (isOptional && isEmpty) continue;

        if (!firstName || !lastName || !steam || !shirtSize) {
            return {
                statusCode: 400,
                body: `Wypełnij wszystkie pola zawodnika nr ${i + 1}!`
            };
        }

        if (birthDate && isNaN(Date.parse(birthDate))) {
            return {
                statusCode: 400,
                body: `Niepoprawny format daty urodzenia zawodnika nr ${i + 1}.`
            };
        }
    }

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
        for (const member of realMembers) {
            const { firstName, lastName, steam, birthDate, shirtSize } = member;
            await client.query(
                `INSERT INTO Players (Name, Surname, Steam, birthDate, ShirtSize, Team_id) 
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [firstName, lastName, steam, birthDate, shirtSize, teamId]
            );
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
                    Data urodzenia: ${m.birthDate || 'Brak'}<br>
                </p>
            `
        ).join('');

        await transporter.sendMail({
            from: `"Rejestracja do turnieju" ${process.env.EMAIL_USER}`,
            to: process.env.ORGANIZER_EMAIL,
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
            return { statusCode: 400, body: "Nazwa drużyny jest już zajęta." };
        }

        console.error("Błąd serwera:", err);
        return { statusCode: 500, body: "Błąd serwera: " + err.message };
    } finally {
        client.release();
    }
}
