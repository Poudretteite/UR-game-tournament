import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.post("/submit-form", async (req, res) => {
  try {
    const { name, email, telephone, teamName } = req.body;
    const result = await pool.query(
      "INSERT INTO teams(name, email, telephone, team_name) VALUES($1, $2, $3, $4) RETURNING *",
      [name, email, telephone, teamName]
    );
    res.json({ success: true, team: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
