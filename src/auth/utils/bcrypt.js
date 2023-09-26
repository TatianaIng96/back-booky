const bcrypt = require("bcrypt");
const crypto = require("crypto");

const hashPassword = async (password) => {
  const factor = 12;
  const salt = await bcrypt.genSalt(factor);
  return await bcrypt.hash(password, salt);
};

const hashPasswordSync = (password) => {
  const factor = 12;
  const salt = bcrypt.genSaltSync(factor);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const createValidationToken = (data) => {
  return crypto.createHash("sha256").update(data).digest("hex");
};

module.exports = {
  hashPassword,
  hashPasswordSync,
  comparePassword,
  createValidationToken,
};
