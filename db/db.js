import pkg from "pg";
const { Client } = pkg;

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

db.connect()
  .then(() => console.log("Connected to Neon PostgreSQL 🚀"))
  .catch(err => console.error("Connection error ❌", err));

export default db;