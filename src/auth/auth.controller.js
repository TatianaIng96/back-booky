const { Response } = require("express");

const { getUserByEmail } = require("../api/user/user.service");
const { verifyToken } = require("./auth.service");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Verificar el token
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await getUserByEmail(decoded.email);

  req.user = user;

  return next();
};

const hasRole = (allowedRole) => {
  return (req, res, next) => {
    const { role } = req.user;
    const hasPermission = allowedRole.includes(role);

    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

module.exports = {
  isAuthenticated,
  hasRole,
};
