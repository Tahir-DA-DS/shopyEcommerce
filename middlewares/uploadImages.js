const multer = require("multer");
const path = require("path");
const sharp = require("sharp")

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the upload destination
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
})

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true); // Accept the file
  } else {
    cb(
      {
        message: "Unsupported file format", // Reject the file
      },
      false
    );
  }
};

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
    })
  );
  next()
};

const blogImgResize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/blogs/${file.filename}`);
      })
    );
    next()
  };
  

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000 },
});

module.exports = {uploadPhoto, productImgResize, blogImgResize}