const { createUser, listUsers, getUserByEmail } = require("./user.service");
const {
  hashPassword,
  createValidationToken,
} = require("../../auth/utils/bcrypt");

const userCreateController = async (req, res) => {
  try {
    const body = req.body;

    const hashedPassword = await hashPassword(body.password);

    const data = {
      ...body,
      password: hashedPassword,
      validateToken: createValidationToken(body.email),
      tokenExpires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    };

    const user = await createUser(data);

    res.status(201).json({ message: "User created", data: user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};

const listUsersController = async (req, res) => {
  try {
    const users = await listUsers();

    res.status(200).json({ message: "Users listed", data: users });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error listing users", error: error.message });
  }
};

module.exports = {
  userCreateController,
  listUsersController,
};
