import Book from "../models/Book.js";

// POST /api/books
export const createBook = async (req, res) => {
  const { title, author, condition, image } = req.body;

  const book = await Book.create({
    title,
    author,
    condition,
    image,
    owner: req.user._id,
  });

  res.status(201).json(book);
};

// GET /api/books
export const getAllBooks = async (req, res) => {
  // show all books except those owned by current user
  const books = await Book.find({ owner: { $ne: req.user._id } }).populate(
    "owner",
    "name email"
  );
  res.json(books);
};

// GET /api/books/my
export const getMyBooks = async (req, res) => {
  const books = await Book.find({ owner: req.user._id });
  res.json(books);
};

// PUT /api/books/:id
export const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ msg: "Book not found" });

  // ensure only owner can update
  if (book.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.condition = req.body.condition || book.condition;
  book.image = req.body.image || book.image;

  const updated = await book.save();
  res.json(updated);
};

// DELETE /api/books/:id
export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ msg: "Book not found" });

  if (book.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ msg: "Not authorized" });
  }

  await book.deleteOne();
  res.json({ msg: "Book removed" });
};
