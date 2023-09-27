const User = require("../user/user.model");

const {
  createCategory,
  getAllCategory,
  deleteCategory,
} = require("./category.service");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = {
      name,
    };

    const category = await createCategory(newCategory);

    res.status(201).json({ message: "category created", data: category });
  } catch (error) {
    res
      .status(400)
      .json({ message: "book could not created", data: error.message });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const category = await getAllCategory();
    res.status(200).json({ message: "Books listed", data: category });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Books could not listed", data: error.message });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await deleteCategory(id);

    res.status(200).json({ message: "Book deleted", data: category });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Book could not deleted", data: error.message });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoryController,
  deleteCategoryController,
};
