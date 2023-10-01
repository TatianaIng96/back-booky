// Importa el modelo de transacción
const Transaction = require("./transaction.model");
const User = require("../user/user.model");
const Stripe = require("stripe");

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

// Crear una nueva transacción
const createTransaction = async (req, res) => {
  try {
    const { paymentMethod, totalAmount, books, sellerId, buyerId } = req.body;
    const montoCentavos = Math.round(totalAmount * 100);
    const { id } = paymentMethod;
    const payment = await stripe.paymentIntents.create({
      payment_method: id,
      amount: montoCentavos,
      currency: "usd",
      confirm: true,
      description: "Software development services provided",
      return_url: "http://localhost:3000/home",
    });

    const newTransaction = new Transaction({
      totalAmount: montoCentavos,
      books,
      sellerId,
      buyerId,
    });
    const savedTransaction = await newTransaction.save();
    const userBuyer = await User.findById(buyerId);
    userBuyer.transactions.unshift(savedTransaction);
    await userBuyer.save({ validateBeforeSave: false });
    const userSeller = await User.findById(sellerId);
    userSeller.transactions.unshift(savedTransaction);
    await userSeller.save({ validateBeforeSave: false });
    res.status(201).json({ message: "Payment successful", payment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener detalles de una transacción por ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.transactionId);
    if (!transaction) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la transacción" });
  }
};

// Obtener una lista de todas las transacciones
const getAllTransactions = async (req, res) => {
  console.log("aqui estoy");
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las transacciones" });
  }
};

// Actualizar una transacción por ID
const updateTransactionById = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.transactionId,
      req.body,
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la transacción" });
  }
};

// Eliminar una transacción por ID
const deleteTransactionById = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.transactionId
    );

    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transacción no encontrada" });
    }

    res.json({ message: "Transacción eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la transacción" });
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransactionById,
  deleteTransactionById,
};
