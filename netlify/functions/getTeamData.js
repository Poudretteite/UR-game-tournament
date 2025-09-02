import { Pool } from "pg";
import Papa from "papaparse";
import JSZip from "jszip";
import ExcelJS from "exceljs";

const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  export async function handler(event) {
  const token = event.headers['x-admin-token'];

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (token !== process.env.ADMIN_API_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: "Unauthorized" })
    };
  }

  const client = await pool.connect();
  try {
    // const result = await client.query(`
    //   SELECT 
    //     t.TeamName, t.CaptainName, t.CaptainTel, t.CaptainEmail, 
    //     p.id, p.name, p.surname, p.Steam, p.BirthDate, p.ShirtSize, p.team_id
    //   FROM Teams t
    //   JOIN Players p ON t.id = p.team_id
    //   ORDER BY t.id, p.id
    // `);

    // const jsonString = JSON.stringify(result.rows, null, 2);
    // const csv = Papa.unparse({
    //   fields: [
    //     { label: "Nazwa Drużyny", value: "teamname" },
    //     { label: "Imię I Nazwisko Kapitana", value: "captainname" },
    //     { label: "Telefon Kapitana", value: "captaintel" },
    //     { label: "Email Kapitana", value: "captainemail" },
    //   ]
    // });

    // const zip = new JSZip();
    // zip.file("team_data.json", jsonString);
    // zip.file("team_data.csv", csv);

    // const zipContent = await zip.generateAsync({ type: "base64" });

    // return {
    //   statusCode: 200,
    //   headers: {
    //     "Content-Type": "application/zip",
    //     "Content-Disposition": "attachment; filename=team_data.zip",
    //   },
    //   isBase64Encoded: true,
    //   body: zipContent
    // };

    const teams = await client.query(`
      SELECT * FROM Teams ORDER BY id
    `);

    const players = await client.query(`
      SELECT * FROM Players ORDER BY team_id, id
    `);

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
    console.error("Błąd:", err);
    return { statusCode: 500, body: err.message };
  } finally {
    client.release();
  }
}