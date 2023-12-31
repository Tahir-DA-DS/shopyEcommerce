const User =require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");

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
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      mobile: findUser?.mobile,
      token: generateToken(findUser._id),
    });
  } else {
    throw new Error("invalid credentials");
  }
});

const getAllusers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

const getaUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await User.findById(id);
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

const updateaUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

const delaUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const delUser = await User.findByIdAndDelete(id);
    res.json(`user with id : ${delUser._id} has been deleted`);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { creatUser, loginCtrl, getAllusers, getaUser, delaUser, updateaUser};
