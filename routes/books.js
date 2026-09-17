import express from "express";
import db from "../db/db.js";
import axios from "axios";

const router = express.Router();


// ✅ GET all books (with sorting support)
router.get("/", async (req, res) => {
  const sort = req.query.sort || "date"; // default sort

  let orderBy = "date_read DESC";
  if (sort === "rating") orderBy = "rating DESC";
  if (sort === "title") orderBy = "title ASC";

  try {
    const result = await db.query(`SELECT * FROM books ORDER BY ${orderBy}`);
    res.render("index", { books: result.rows || [] });
  } catch (err) {
    console.error(err);
    res.send("Error loading page");
  }
});

router.get("/book/:id", async (req, res) => {
  const id = req.params.id;

  const result = await db.query("SELECT * FROM books WHERE id=$1", [id]);

  res.render("book", { book: result.rows[0] });
});

// ✅ Show add page (search-based)
router.get("/add", (req, res) => {
  const error = req.query.error;
  res.render("add", { error });
});

// ✅ Search books using Open Library API
router.get("/search", async (req, res) => {
  const query = req.query.q;

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${query}`
    );

    const books = response.data.docs.slice(0, 5);

    res.render("search", { books });
  } catch (err) {
    console.error(err);
    res.send("Error fetching books");
  }
});


// ✅ Add book to DB
router.post("/add", async (req, res) => {
  const { title, author, rating, notes, cover_id, date_read } = req.body;

  try {
    await db.query(
      "INSERT INTO books (title, author, rating, notes, cover_id, date_read) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, rating, notes, cover_id, date_read]
    );

    res.redirect("/");
  } catch (err) {
    // 🔥 Handle duplicate error properly
    if (err.code === "23505") {
      return res.redirect("/add?error=exists");
    }

    console.error(err);
    res.send("Error adding book");
  }
});

// ✅ Show edit form
router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.send("Book not found");
    }

    res.render("edit", { book: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.send("Error loading edit page");
  }
});


// ✅ Update book
router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, rating, notes, date_read } = req.body;

  try {
    // ✅ 1. Get existing cover_id from DB
    const existing = await db.query(
      "SELECT cover_id FROM books WHERE id=$1",
      [id]
    );

    if (existing.rows.length === 0) {
      return res.send("Book not found");
    }

    const cover_id = existing.rows[0].cover_id;

    // ✅ 2. Update WITHOUT losing cover_id
    await db.query(
      `UPDATE books 
       SET title=$1, author=$2, rating=$3, notes=$4, date_read=$5, cover_id=$6 
       WHERE id=$7`,
      [title, author, rating, notes, date_read, cover_id, id]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error updating book");
  }
});


// ✅ DELETE book (correct way using POST)
router.post("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error deleting book");
  }
});


export default router;