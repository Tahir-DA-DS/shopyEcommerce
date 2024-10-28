const express = require("express");
const router = express.Router();
const {
  createProduct,
  getaProduct,
  getAllproducts,
  updateProduct,
  deleteProduct,
  addToWishList
} = require("../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");


router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllproducts);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.put("/wishlist", authMiddleware, addToWishList);


module.exports = router;
