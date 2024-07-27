const { checkAuthMiddleware } = require("./checkAuthMiddleware");
const { uploadMiddleware } = require("./uploadMiddleware");

module.exports = {
  checkAuthMiddleware,
  uploadMiddleware,
};
