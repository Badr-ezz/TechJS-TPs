
import express, { type Request, type Response } from "express";
import path from "path";
import { connectDB, addBook, BookModel } from "./db"
import { Book } from "./Book";
import { Status, Format } from "./enums";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

connectDB().catch((err) => {
  console.error("DB error:", err);
});

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(publicPath, "register.html"));
});

app.get("/tracking", (_req: Request, res: Response) => {
  res.sendFile(path.join(publicPath, "tracking.html"));
});

app.post("/api/books", async (req: Request, res: Response) => {
  try {
    const {
      title,
      author,
      numberOfPages,
      status,
      price,
      pagesRead,
      format,
      suggestedBy
    } = req.body;

    const book = new Book(
      String(title),
      String(author),
      Number(numberOfPages),
      status ,
      Number(price),
      Number(pagesRead),
      format ,
      String(suggestedBy || "")
    );

    const saved = await addBook(book);
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add book" });
  }
});

app.get("/api/books", async (_req: Request, res: Response) => {
  try {
    const books = await BookModel.find();

    const totalBooks = books.length;
    const totalPages = books.reduce(
      (sum, b: any) => sum + (b.numberOfPages || 0),
      0
    );

    const mapped = books.map((b: any) => {
      const percentage =
        b.numberOfPages > 0
          ? Math.floor((b.pagesRead / b.numberOfPages) * 100)
          : 0;

      return {
        id: b._id,
        title: b.title,
        author: b.author,
        numberOfPages: b.numberOfPages,
        pagesRead: b.pagesRead,
        status: b.status,
        format: b.format,
        suggestedBy: b.suggestedBy,
        finished: b.finished,
        percentage
      };
    });

    res.json({
      books: mapped,
      stats: {
        totalBooks,
        totalPages
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
