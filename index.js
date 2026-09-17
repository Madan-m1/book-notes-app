import express from "express";
import bodyParser from "body-parser";
import booksRoutes from "./routes/books.js";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// View engine
app.set("view engine", "ejs");

// Routes
app.use("/", booksRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});