import express from "express";
import {
  createRequest,
  getMyRequests,
  getRequestsForMyBooks,
  updateRequestStatus,
} from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// create a request for a book
router.post("/:bookId", protect, createRequest);

// requests I made
router.get("/my", protect, getMyRequests);

// requests made on my books
router.get("/received", protect, getRequestsForMyBooks);

// accept or decline a request
router.put("/:id", protect, updateRequestStatus);

export default router;
