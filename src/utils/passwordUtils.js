const bcrypt = require("bcrypt");

const SALT_ROUNDS = process.env.SALT_ROUNDS || 8;

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (rawPassword, hashedPassword) =>
  bcrypt.compareSync(rawPassword, hashedPassword);

module.exports = {
  hashPassword,
  comparePassword
};
