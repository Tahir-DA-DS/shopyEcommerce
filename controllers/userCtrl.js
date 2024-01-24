const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongodbid");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");

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
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateUser = await User.findByIdAndUpdate(
      findUser._id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
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
    validateMongoDbId(_id);
    const getUser = await User.findById(_id);
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
  // Logging for debugging purposes
  console.log('Handling refresh token request');

  // Access cookies safely
  const cookies = req.cookies;
  if (!cookies || !cookies.refreshToken) {
    throw new Error("No refresh token in Cookies");
  }

  const refreshToken = cookies.refreshToken;

  // Find user by refresh token
  const user = await User.findOne({ refreshToken });

  if (!user) {
    throw new Error("No refresh token in the db or No Match");
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with the refresh token");
    }

    // Generate a new access token
    const accessToken = generateToken(user._id);

    // Send the new access token in the response
    res.json({ accessToken });
  });
});


const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" }); // Update here
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});


const updateaUser = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    validateMongoDbId(_id);
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
    validateMongoDbId(_id);
    const delUser = await User.findByIdAndDelete(_id);
    res.json(`user with id : ${delUser._id} has been deleted`);
  } catch (error) {
    throw new Error(error);
  }
});

const blockUSer = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isblocked: true,
      },
      {
        new: true,
      },
      res.json({ message: "user blocked" })
    );
  } catch (error) {
    throw new Error(error);
  }
});

const unblockUSer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isblocked: false,
      },
      {
        new: true,
      },
      res.json({ message: "user unblocked" })
    );
  } catch (error) {
    throw new Error(error);
  }
});

const updatePassword = asyncHandler(async (req, res)=>{
  const {_id} = req.user
  console.log(_id);
  const {password} = req.body
  validateMongoDbId(_id)
  const user = await User.findById(_id)
  if(password){
    user.password = password
    const updatedPassword = await user.save()
    res.json(updatedPassword)
  } else{
    res.json(user)
  }
})

module.exports = {
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
  updatePassword
};
