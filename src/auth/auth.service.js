const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (error) {
    // Manejar el error
    console.error("Error al verificar el token:", error.message);
    return null; // O lanzar una excepción personalizada si lo prefieres
  }
};

const signToken = (payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "1d" });
  return token;
};

module.exports = {
  verifyToken,
  signToken,
};
