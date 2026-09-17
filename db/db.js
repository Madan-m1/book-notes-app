import {Client} from "pg";

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "booknotes",
  password: "pppp",
  port: 5432,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Connection error", err));

export default db;