const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const creatUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email });
  if (!findUser) {
    //create user
    const newuser = await User.create(req.body);
    res.json(newuser);
  } else {
    throw new Error("User Already Exist");
  }
});

const loginCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser && findUser.isPasswordMatch(password)) {
    res.json(findUser);
  } else {
    throw new Error("invalid credentials");
  }
});
module.exports = { creatUser, loginCtrl };
