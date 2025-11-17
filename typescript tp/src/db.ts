import mongoose from "mongoose";
import { Status, Format } from "./enums";

export async function connectDB(): Promise<void> {
  try {
    const uri = "mongodb://localhost:27017/booksDB";

    await mongoose.connect(uri);
    console.log(" MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  numberOfPages: { type: Number, required: true },
  status: { type: String, enum: Object.values(Status), required: true },
  price: { type: Number, required: true },
  pagesRead: { type: Number, required: true },
  format: { type: String, enum: Object.values(Format), required: true },
  suggestedBy: { type: String },
  finished: { type: Boolean, default: false },
});

export const BookModel = mongoose.model("Book", bookSchema);

export async function addBook(bookData: any) {
  try {
    const finished = bookData.pagesRead >= bookData.numberOfPages;
    const newBook = new BookModel({
      ...bookData,
      finished
    });

    const savedBook = await newBook.save();
    return savedBook;
  } catch (err) {
    console.error("Error adding book:", err);
    throw err;
  }
}
