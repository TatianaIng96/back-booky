const { Schema, model, models } = require("mongoose");

const emailRegex = new RegExp("[a-zA-Z0-9]{5,10}@[a-z]{3,10}.com");

const userSchema = new Schema(
  {
    name: {
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
    validateToken: {
      type: String,
      unique: true,
      required: [true, "Token is required"],
    },
    tokenExpires: {
      type: Date,
      required: true,
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
