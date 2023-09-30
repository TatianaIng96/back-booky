const router = require("express").Router();
const {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransactionById,
  deleteTransactionById,
} = require("./transaction.controller");

// Rutas
router.route("/").post(createTransaction);
router.route("/:transactionId").get(getTransactionById);
router.route("/").get(getAllTransactions);
router.route("/:transactionId").put(updateTransactionById);
router.route("/:transactionId").delete(deleteTransactionById);

module.exports = router;
