const router = require("express").Router();
const {
  userCreateController,
  listUsersController,
  updateUser,
} = require("./user.controller");

router.route("/").post(userCreateController);
router.route("/").get(listUsersController);

module.exports = router;
