const Category = require("./category.model");

const createCategory = async (data) => {
  try {
    const category = await Category.create(data);
    return category;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllCategory = async () => {
  try {
    const category = await Category.find();
    return category;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const category = await Category.findByIdAndDelete(id);
    return category;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  deleteCategory,
};
