const { Schema, model, models } = require("mongoose");

const transactionSchema = new Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    books: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
