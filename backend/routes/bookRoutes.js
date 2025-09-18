import express from "express";
import {
  createBook,
  getAllBooks,
  getMyBooks,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All books except you can see everyone’s books
router.get("/", protect, getAllBooks);

// Your own books
router.get("/my", protect, getMyBooks);

// Create new book
router.post("/", protect, createBook);

// Update & delete your book
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

export default router;
