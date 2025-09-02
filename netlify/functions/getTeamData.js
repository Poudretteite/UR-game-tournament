import { Pool } from "pg";
import Papa from "papaparse";
import JSZip from "jszip";

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
    const result = await client.query(`
      SELECT 
        t.TeamName, t.CaptainName, t.CaptainTel, t.CaptainEmail, 
        p.id, p.name, p.surname, p.Steam, p.BirthDate, p.ShirtSize, p.team_id
      FROM Teams t
      JOIN Players p ON t.id = p.team_id
      ORDER BY t.id, p.id
    `);

    const jsonString = JSON.stringify(result.rows, null, 2);
    const csv = Papa.unparse(result.rows);

    const zip = new JSZip();
    zip.file("team_data.json", jsonString);
    zip.file("team_data.csv", csv);

    const zipContent = await zip.generateAsync({ type: "base64" });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=team_data.zip",
      },
      isBase64Encoded: true,
      body: zipContent
    };

  } catch (err) {
    console.error("Błąd:", err);
    return { statusCode: 500, body: err.message };
  } finally {
    client.release();
  }
}