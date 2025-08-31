import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});


  export async function handler(event) {
    
  const token = event.headers['x-admin-token'];
  if (token !== process.env.ADMIN_API_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: "Unauthorized" })
    };
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