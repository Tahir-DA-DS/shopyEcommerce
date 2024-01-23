const express = require("express");
const router = express.Router();
const {
  createProduct,
  getaProduct,
  getAllproducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getaProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllproducts);

module.exports = router;
