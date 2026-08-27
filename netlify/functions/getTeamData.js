import { Pool } from "pg";
import ExcelJS from "exceljs";
import crypto from "crypto";
import { rateLimit } from "./rateLimit.js";

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const rawIp = event.headers['x-forwarded-for'] || event.headers['X-Forwarded-For'] || event.ip || 'unknown';
  const ip = rawIp.split(',')[0].trim();

  // Ochrona przed atakami brute-force na klucz administratora (maksymalnie 5 prób na minutę)
  if (rateLimit(ip, 5, 60 * 1000)) {
    return {
      statusCode: 429,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Zbyt wiele prób. Spróbuj ponownie później." })
    };
  }

  const token = event.headers['x-admin-token'] || event.headers['X-Admin-Token'];
  const expectedKey = process.env.ADMIN_API_KEY;

  // Bezwzględna blokada: klucz musi być zdefiniowany na serwerze i przekazany w nagłówku
  if (!expectedKey || !token || typeof token !== 'string') {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Unauthorized" })
    };
  }

  // Bezpieczne porównanie odporne na timing attack
  const tokenBuf = Buffer.from(token);
  const keyBuf = Buffer.from(expectedKey);
  if (tokenBuf.length !== keyBuf.length || !crypto.timingSafeEqual(tokenBuf, keyBuf)) {
    return {
      statusCode: 401,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Unauthorized" })
    };
  }

  const client = await pool.connect();
  try {
    const [teams, players] = await Promise.all([
      client.query(`SELECT * FROM Teams ORDER BY id`),
      client.query(`SELECT * FROM Players ORDER BY team_id, id`)
    ]);

    const workbook = new ExcelJS.Workbook();

    const teamSheet = workbook.addWorksheet('Teams');
    teamSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Nazwa Drużyny", key: "teamname", width: 30 },
      { header: "Imię I Nazwisko Kapitana", key: "captainname", width: 30 },
      { header: "Telefon Kapitana", key: "captaintel", width: 20 },
      { header: "Email Kapitana", key: "captainemail", width: 30 },
    ];
    teamSheet.addRows(teams.rows);

    const playerSheet = workbook.addWorksheet('Players');
    playerSheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Imię", key: "name", width: 20 },
      { header: "Nazwisko", key: "surname", width: 20 },
      { header: "Steam", key: "steam", width: 30 },
      { header: "Data Urodzenia", key: "birthdate", width: 15 },
      { header: "Rozmiar Koszulki", key: "shirtsize", width: 15 },
      { header: "ID Drużyny", key: "team_id", width: 10 },
    ];
    playerSheet.addRows(players.rows);

    const buffer = await workbook.xlsx.writeBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename=team_data.xlsx",
      },
      isBase64Encoded: true,
      body: base64Data
    };

  } catch (err) {
    console.error("Błąd podczas generowania raportu zespołów:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, message: "Wewnętrzny błąd serwera." })
    };
  } finally {
    client.release();
  }
}