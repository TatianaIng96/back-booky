const router = require("express").Router();
const {
  createCategoryController,
  getAllCategoryController,
  deleteCategoryController,
} = require("./category.controller");

const { isAuthenticated, hasRole } = require("../../auth/auth.controller");

router.route("/").post(createCategoryController);
router.route("/").get(getAllCategoryController);
router.route("/:id").delete(deleteCategoryController);

module.exports = router;
