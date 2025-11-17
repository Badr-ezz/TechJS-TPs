const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const Book = require("./models/book");
const User = require("./models/user");

const app = express();
const port = 3000;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Home page
app.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
});

// Register form
app.get("/register", (req, res) => res.render("register"));

// Handle registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await new User({ username, password: hashed }).save();
  res.redirect("/");
});

// Add book
app.post("/books", async (req, res) => {
  const { title, author, publishedDate } = req.body;
  await new Book({ title, author, publishedDate }).save();
  res.redirect("/");
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
