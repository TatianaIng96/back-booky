const User = require("./user.model");

const createUser = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const listUsers = async () => {
  try {
    const users = await User.find().select().populate({
      path: "books",
      select: "title description status",
    });
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByValidateToken = async (token) => {
  try {
    const user = await User.findOne({ validateToken: token });
    return user;
  } catch (error) {
    console.error(error);
    throw error; // Puedes manejar el error de la manera que prefieras en tu aplicación.
  }
};

const getUserByEmail = async (email) => {
  try {
    if (!email) {
      return res
        .status(400)
        .json({ message: "Se requiere un correo electrónico." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    return user;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

const updateUser = async (id, newData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!updatedUser) {
      throw new Error("No se encontró el usuario para actualizar.");
    }
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  listUsers,
  getUserByEmail,
  getUserByValidateToken,
  updateUser,
};
