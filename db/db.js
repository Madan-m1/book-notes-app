import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pkg;

console.log("ENV:", process.env.DATABASE_URL); // debug

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => console.log("✅ Connected to Neon PostgreSQL"))
  .catch(err => console.error("❌ Connection error", err));

export default db;