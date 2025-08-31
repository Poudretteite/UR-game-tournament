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

    if (!team || !Array.isArray(members) || members.length === 0) {
        return { statusCode: 400, body: "Wypełnij wszystkie pola." };
    }

    for (const member of members) {
        const {firstName, lastName, steam, birthDate, shirtSize} = member;

        if (!firstName || !lastName || !steam || !shirtSize) {
            return { statusCode: 400, body: "Wypełnij wszystkie pola." };
        }

        if (birthDate && isNaN(Date.parse(birthDate))) {
            return { statusCode: 400, body: "Niepoprawny format daty urodzenia." };
        }
    }

    const validationError = validateForm(data);
    if (validationError) {
        return { 
            statusCode: 400, 
            body: JSON.stringify({ 
                success: false, message: validationError }) 
            };
    }

    const client = await pool.connect();
    try {
        console.log("Connecting to DB...");
        await client.query("BEGIN");
        console.log("DB connected");

        const result = await client.query(
            `INSERT INTO Teams (TeamName, CaptainName, CaptainTel, CaptainEmail) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
            [team.teamName, team.captainName, team.captainTel, team.captainEmail]
        );
        const teamId = result.rows[0].id;

        for (const member of members) {
            const {firstName, lastName, steam, birthDate, shirtSize} = member;
            await client.query(
                `INSERT INTO Players (Name, Surname, Steam, birthDate, ShirtSize, TeamId) 
                 VALUES ($1, $2, $3, $4, $5, $6)`,
                [member.firstName, member.lastName, member.steam, member.birthDate, member.shirtSize, teamId]
            );
        }

        await client.query("COMMIT");
        return { statusCode: 200, body: "Rejestracja zakończona sukcesem." };

    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Błąd serwera:", err);
        return { statusCode: 500, body: "Błąd serwera" + err.message};
    } finally {
        client.release();
    }
}
