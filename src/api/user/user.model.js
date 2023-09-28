const { Schema, model, models } = require("mongoose");

const emailRegex = new RegExp("[a-zA-Z0-9]{5,10}@[a-z]{3,10}.com");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [15, "Name must be at most 15 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [15, "Name must be at most 15 characters long"],
    },
    email: {
      type: String,
      match: [emailRegex, "Email is not valid"],
      validate: [
        {
          validator: async (value) => {
            try {
              const user = await models.user.findOne({ email: value });
              return !user;
            } catch (error) {
              return false;
            }
          },
          message: "Email already exists",
        },
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    adress: {
      type: String,
      required: [true, "adress is required"],
    },
    validateToken: {
      type: String,
      unique: true,
      required: false, // Permite que este campo sea nulo
      default: null,
    },
    tokenExpires: {
      type: Date,
      required: false, // Permite que este campo sea nulo
      default: null,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    books: {
      type: [{ type: Schema.Types.ObjectId, ref: "book" }],
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model("user", userSchema);

module.exports = User;
