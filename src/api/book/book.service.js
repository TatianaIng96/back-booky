const Book = require("./book.model");

const createBook = async (data) => {
  try {
    const book = await Book.create(data);
    return book;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllBook = async () => {
  try {
    const books = await Book.find().select("title body completed").populate({
      path: "user",
      select: "name email -_id",
    });
    return books;
  } catch (error) {
    throw new Error(error);
  }
};

const getBookById = async (id) => {
  try {
    const book = await Book.findById(id);
    return book;
  } catch (error) {
    throw new Error(error);
  }
};

const updateBook = async (id, data) => {
  try {
    const newBook = Book.findByIdAndUpdate(id, data, { new: true });
    return newBook;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteBook = async (id) => {
  try {
    const book = await Book.findByIdAndDelete(id);
    return book;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
};
