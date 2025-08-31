import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  export async function handler(event) {
  // Check admin token in headers
  const token = event.headers['x-admin-token'];
  if (token !== process.env.ADMIN_API_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: "Unauthorized" })
    };
  }

  try {
    const result = await pool.query("SELECT * FROM registrations ORDER BY created_at DESC");

    // Optional: Return as JSON or CSV
    const csvHeader = "id,name,email,gamertag,created_at\n";
    const csvRows = result.rows.map(r => `${r.id},${r.name},${r.email},${r.gamertag},${r.created_at}`).join("\n");
    const csv = csvHeader + csvRows;

    return {
      statusCode: 200,
      headers: { "Content-Type": "text/csv" },
      body: csv
    };
  } catch (err) {
    console.error("Database error:", err);
    return { statusCode: 500, body: "Server error" };
  }
}
import validateForm from "./validateForm.js";