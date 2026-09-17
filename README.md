# 📚 Book Notes App

A full-stack web application to capture, organize, and revisit insights from books you read.

🔗 **Live Demo:** https://book-notes-app-djxk.onrender.com/  
💻 **Repository:** https://github.com/Madan-m1/book-notes-app

---

## 🚀 Features

- 📖 Add books with title, author, rating, and notes
- 🔍 Search books by title, author, or notes
- 📊 Sort books by date, rating, or title
- ✏️ Edit and delete books
- 🖼️ Automatic book cover fetch (OpenLibrary API)
- 📱 Fully responsive mobile UI
- ⚡ RESTful backend with Express.js
- ☁️ Cloud database (Neon PostgreSQL)
- 🌐 Deployed on Render
- ⚡ Fast and simple UI with EJS templates

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Frontend | EJS, CSS |
| Database | PostgreSQL (Neon Cloud) |
| Deployment | Render |
| API Integration | OpenLibrary (for book covers) |

---

## 📂 Project Structure

```bash
book-notes-app/
│
├── db/
│   └── db.js              # PostgreSQL connection
│
├── routes/
│   └── books.js          # Book routes (CRUD logic)
│
├── public/
│   └── style.css         # Styles
│
├── views/                # EJS templates
│   ├── index.ejs
│   ├── add.ejs
│   ├── edit.ejs
│   ├── book.ejs
│   └── search.ejs
│
├── .env                  # Environment variables
├── .gitignore
├── index.js              # Main server file
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation & Setup (Local)

### 1. Clone the repo
```bash
git clone https://github.com/Madan-m1/book-notes-app.git
cd book-notes-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file
```env
DATABASE_URL=your_neon_connection_string
```

### 4. Run the app
```bash
npm start
```

The app will be available at `http://localhost:3000` (or your configured port).

---

## 🗄️ Database Schema

```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  rating INTEGER,
  notes TEXT,
  cover_id TEXT,
  date_read DATE,
  CONSTRAINT unique_book UNIQUE (title, author)
);
```

---

## 🌍 Deployment

- **Backend:** Hosted on [Render](https://render.com)
- **Database:** Hosted on [Neon PostgreSQL](https://neon.tech)

---

## 📸 Screenshots

![Book Notes App](image.png)

---

## 🔥 Future Improvements

- [ ] 🔐 User authentication (login/signup)
- [ ] 📊 Reading analytics dashboard
- [ ] 📚 Pagination / infinite scroll
- [ ] ⭐ Bookmark / favorites system
- [ ] 📤 Export notes (PDF/Markdown)

---

## 👨‍💻 Author

**Madan Kumar M**
GitHub: [@Madan-m1](https://github.com/Madan-m1)

---

## ⭐ Why This Project?

This project demonstrates:
- Full-stack development skills (Node.js, Express, EJS)
- Cloud database integration (Neon PostgreSQL)
- Real-world deployment experience (Render)
- Clean UI and practical, everyday functionality
