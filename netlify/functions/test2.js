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

    const apiKey = event.headers['x-api-key'];
        if (apiKey !== process.env.VITE_FRONTEND_KEY) {
            return { statusCode: 401, body: JSON.stringify({ success: false, message: "Brak autoryzacji." }) };
        }

        try {
            // Simple test query
            const result = await pool.query("SELECT NOW() AS current_time");
            return {
              statusCode: 200,
              body: JSON.stringify({ success: true, time: result.rows[0].current_time })
            };
          } catch (err) {
            console.error("Database connection error:", err);
            return {
              statusCode: 500,
              body: JSON.stringify({ success: false, error: err.message })
            };
          }
}
