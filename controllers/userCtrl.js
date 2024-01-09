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
    const { _id } = req.user;
    const getUser = await User.findById(_id);
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

const updateaUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const updateUser = await User.findByIdAndUpdate(
      _id,
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
    const { _id } = req.user;
    const delUser = await User.findByIdAndDelete(_id);
    res.json(`user with id : ${delUser._id} has been deleted`);
  } catch (error) {
    throw new Error(error);
  }
});

const blockUSer = asyncHandler(async (req, res)=>{
  console.log(req.params);
  const {id} = req.params
  
  try {
    const block = await User.findByIdAndUpdate(id, 
      {
      isblocked:true
    },
    {
      new:true
    },
    res.json({message:"user blocked"})
    )
  } catch (error) {
    throw new Error(error)
  }
})

const unblockUSer = asyncHandler(async (req, res)=>{
  const {id} = req.params
  try {
    const unblock = await User.findByIdAndUpdate(id, 
      {
      isblocked:false
    },
    {
      new:true
    },
    res.json({message:"user unblocked"})
    )
  } catch (error) {
    throw new Error(error)
  }
})
module.exports = { creatUser, loginCtrl, getAllusers, getaUser, delaUser, updateaUser, blockUSer, unblockUSer};
