const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, filterCallBack) {
    const isValidImage = file.originalname.match(/\.(jpg|jpeg)$/);
    if (!isValidImage) {
      return filterCallBack(
        new Error("Please upload a valid image (jpg, jpeg).")
      );
    }
    filterCallBack(undefined, true);
  },
  storage: storage,
}).single("avatar");

const uploadMiddleware = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      console.error(console.error);
      req.flash("alert", "Error while uploading the avatar.");
      return res.redirect("/auth/signup");
    }
    next();
  });
};

module.exports = {
  uploadMiddleware,
};
