const { Request, Response } = require("express");
const {
  getUserByEmail,
  getUserByValidateToken,
  updateUser,
} = require("../../api/user/user.service");

const { comparePassword } = require("../utils/bcrypt");
const { signToken } = require("../auth.service");

exports.loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    if (user.isActive === false) {
      return res.status(401).json({ message: "User is inactivated" });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = signToken(payload);

    const profile = {
      name: user.name,
      email: user.email,
    };
    console.log(profile);

    return res.status(201).json({ token, profile });
  } catch (error) {
    return res.status(401).json({
      message:
        "There has been an error accessing information. Try again later!",
    });
  }
};

exports.activateAccountHandler = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await getUserByValidateToken(token);

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    if (user.tokenExpires) {
      if (Date.now() > user.tokenExpires.getTime()) {
        return res.status(401).json({ message: "Token expired" });
      }
    }

    const data = {
      ...user,
      tokenExpires: null,
      validateToken: null,
    };

    await updateUser(user.id, data);

    const payload = {
      id: user.id,
      email: user.email,
    };

    const tokenToSend = signToken(payload);

    const profile = {
      firstName: user.name,
      email: user.email,
    };

    return res.status(201).json({ token: tokenToSend, profile });
  } catch (error) {
    console.log(error);
  }
};
