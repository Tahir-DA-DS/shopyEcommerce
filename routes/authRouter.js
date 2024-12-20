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
  resetPassword, loginAdmin, getWishList,saveAddress
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", creatUser);
router.post("/forgot-password", forgotPasswordToken)
router.put("/reset-password/:token", resetPassword)
router.post("/login", loginCtrl);
router.post("/admin-login", loginAdmin);
router.put("/password", authMiddleware, updatePassword)
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/all-users", getAllusers);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.get("/wishlist", authMiddleware, getWishList);
router.delete("/:id", delaUser);
router.put("/edit-user", authMiddleware, updateaUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUSer);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUSer);

module.exports = router;
