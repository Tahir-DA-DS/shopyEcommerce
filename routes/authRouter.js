const express = require("express");
const router = express.Router();
const {
  creatUser,
  loginCtrl,
  getAllusers,
  getaUser,
  delaUser,
  updateaUser,
  blockUSer,
  unblockUSer,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword, loginAdmin, getWishList,saveAddress, userCart, getUserCart, emptyCart,  applyCoupon, createOrder, getOrders, updateOrderStatus 
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", creatUser);
router.post("/forgot-password", forgotPasswordToken)
router.put("/reset-password/:token", resetPassword)
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus)
router.post("/login", loginCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", userCart);
router.put("/password", authMiddleware, updatePassword)
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/all-users", getAllusers);
router.get("/get-orders", authMiddleware, getOrders)
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("empty-cart", authMiddleware, emptyCart);

router.get("/wishlist", authMiddleware, getWishList);
router.get("/cart", authMiddleware, getUserCart);
router.post("/cart/applycoupon", authMiddleware,  applyCoupon)
router.post("/cart/cash-order", authMiddleware, createOrder)

router.delete("/:id", delaUser);
router.put("/edit-user", authMiddleware, updateaUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUSer);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUSer);

module.exports = router;
