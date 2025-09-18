import Request from "../models/Request.js";
import Book from "../models/Book.js";

export const createRequest = async (req, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ msg: "Book not found" });

  if (book.owner.toString() === req.user._id.toString()) {
    return res.status(400).json({ msg: "Cannot request your own book" });
  }

  const existing = await Request.findOne({
    book: bookId,
    requester: req.user._id,
  });
  if (existing) return res.status(400).json({ msg: "Already requested" });

  const request = await Request.create({
    book: bookId,
    requester: req.user._id,
  });

  res.status(201).json(request);
};

export const getMyRequests = async (req, res) => {
  const requests = await Request.find({ requester: req.user._id })
    .populate("book")
    .populate("requester", "name email");
  res.json(requests);
};

export const getRequestsForMyBooks = async (req, res) => {
  const requests = await Request.find()
    .populate({
      path: "book",
      match: { owner: req.user._id },
      populate: { path: "owner", select: "name email" },
    })
    .populate("requester", "name email");

  const myBookRequests = requests.filter((r) => r.book);
  res.json(myBookRequests);
};

export const updateRequestStatus = async (req, res) => {
  const { status } = req.body;
  const request = await Request.findById(req.params.id).populate("book");
  if (!request) return res.status(404).json({ msg: "Request not found" });

  if (request.book.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  if (!["accepted", "declined"].includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }

  request.status = status;
  const updated = await request.save();
  res.json(updated);
};
