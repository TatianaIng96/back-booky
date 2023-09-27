const { Schema, model, SchemaType } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [4, "Title must be at least 4 characters long"],
      maxlength: [30, "Title must be at most 30 characters long"],
    },
    description: {
      type: String,
      required: [true, "Body is required"],
      minlength: [4, "Body must be at least 4 characters long"],
      maxlength: [1000, "Body must be at most 30 characters long"],
    },
    status: {
      type: String,
      enum: ["NEW", "USED"],
      default: "NEW",
    },
    author: {
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = model("book", bookSchema);

module.exports = Book;
