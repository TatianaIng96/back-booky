const { Schema, model, SchemaType } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  books: {
    type: [{ type: Schema.Types.ObjectId, ref: "book" }],
    required: false,
  },
});

module.exports = model("Categoria", categorySchema);
