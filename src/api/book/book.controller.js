const User = require("../user/user.model");

const {
  createBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
} = require("./book.service");

const createBookController = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { _id } = req.user;
    const userId = _id.toString();
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const newBook = {
      title,
      description,
      status,
      user: userId, // This is the user id is required to create a book
    };

    const book = await createBook(newBook);
    user.books.unshift(book);
    await user.save({ validateBeforeSave: false });

    res.status(201).json({ message: "book created", data: book });
  } catch (error) {
    res
      .status(400)
      .json({ message: "book could not created", data: error.message });
  }
};

const getAllBookController = async (req, res) => {
  try {
    const books = await getAllBook();
    res.status(200).json({ message: "Books listed", data: books });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Books could not listed", data: error.message });
  }
};

const getBookByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);
    res.status(200).json({ message: "Book listed", data: book });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Book could not listed", data: error.message });
  }
};

const updateBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const newBook = await updateBook(id, data);

    res.status(200).json({ message: "Book updated", data: newBook });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Book could not updated", data: error.message });
  }
};

const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await deleteBook(id);

    res.status(200).json({ message: "Book deleted", data: book });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Book could not deleted", data: error.message });
  }
};

module.exports = {
  createBookController,
  getAllBookController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
};
