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

// ** AUTH ROUTES (No auth middleware) **
router.post("/register", creatUser);
router.post("/login", loginCtrl);
router.post("/admin-login", loginAdmin);
router.post("/forgot-password", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);

// ** CART ROUTES (With auth middleware) **
router.post("/cart", authMiddleware, userCart);
router.get("/cart", authMiddleware, getUserCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.delete("/cart/empty-cart", authMiddleware, emptyCart);

// ** USER ROUTES **
router.get("/all-users", authMiddleware, isAdmin, getAllusers);
router.get("/:id", authMiddleware, isAdmin, getaUser); // Keep dynamic ":id" at the bottom of user routes.
router.put("/edit-user", authMiddleware, updateaUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/password", authMiddleware, updatePassword);
router.delete("/:id", authMiddleware, delaUser);

// ** ORDER ROUTES **
router.get("/get-orders", authMiddleware, getOrders);
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus);

// ** WISHLIST ROUTES **
router.get("/wishlist", authMiddleware, getWishList);

// ** BLOCKING/UNBLOCKING USERS (Admin) **
router.put("/block-user/:id", authMiddleware, isAdmin, blockUSer);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUSer);

// ** TOKEN AND SESSION MANAGEMENT **
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

module.exports = router;
