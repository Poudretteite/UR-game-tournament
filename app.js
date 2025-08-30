import { Pool } from 'pg';
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
async function getData() {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT version()');
    console.log(rows[0].version);
    return rows[0].version;
  } finally {
    client.release();
  }
}
export default async function Page() {
  const data = await getData();
  return <>{data}</>;
}