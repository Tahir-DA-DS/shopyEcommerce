const express = require("express");
const router = express.Router();
const {
  createProduct,
  getaProduct,
  getAllproducts,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadImages
} = require("../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");


router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllproducts);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);


module.exports = router;
