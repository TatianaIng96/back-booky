const router = require("express").Router();
const {
  createBookController,
  getAllBookController,
  getBookByIdController,
  updateBookController,
  deleteBookController,
} = require("./book.controller");

const { isAuthenticated, hasRole } = require("../../auth/auth.controller");

router.route("/").post(isAuthenticated, createBookController);
router.route("/").get(getAllBookController);
router.route("/:id").get(getBookByIdController);
router.route("/:id").put(updateBookController);
router.route("/:id").delete(deleteBookController);

module.exports = router;
