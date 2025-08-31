import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  export async function handler(event) {
  const token = event.headers['x-admin-token'];
  if (token !== process.env.ADMIN_API_KEY) {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: "Unauthorized" })
    };
  }

  
}