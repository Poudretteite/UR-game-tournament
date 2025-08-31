import { Pool } from "pg";
import { validateForm } from "./validateForm.js";

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
        const isEmpty = !firstName && !lastName && !steam && !birthDate && !shirtSize;

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
            m.firstName || m.lastName || m.steam || m.birthDate || m.shirtSize
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
        return { statusCode: 200, body: "Rejestracja zakończona sukcesem." };

    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Błąd serwera:", err);
        return { statusCode: 500, body: "Błąd serwera: " + err.message };
    } finally {
        client.release();
    }
}
