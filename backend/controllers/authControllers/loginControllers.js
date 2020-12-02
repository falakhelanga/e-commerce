import User from "../../models/userModel.js";
import ayscHandler from "express-async-handler";
import bycript from "bcryptjs";
import generateToken from "../../utils/genearateToken.js";

export const postLogin = ayscHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  const comparedPassword = await bycript.compare(password, user.password);

  if (!comparedPassword) {
    res.status(401);
    throw new Error("Invalid password");
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

export const getUserProfile = ayscHandler(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export const updateUserProfile = ayscHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  user.email = req.body.email || user.email;
  user.name = req.body.name || user.name;
  // user.password = bycript.hash(req.body.password, 12) || user.password;
  user.password = req.body.password
    ? bycript.hash(req.body.password, 12)
    : user.password;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    password: updatedUser.password,
    isAdmin: user.isAdmin,
  });
});

export const postRegister = ayscHandler(async (req, res, next) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  const userFound = await User.findOne({ email });

  if (userFound) {
    res.status(400);
    throw new Error("this email already exist please try another one");
  }

  const hashedPassword = await bycript.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

export const getUsers = ayscHandler(async (req, res, next) => {
  const users = await User.find();

  if (!users) {
    res.status(404);
    throw new Error("Users not found");
  }

  res.json(users);
});

export const deleteUser = ayscHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  user.remove();
  res.json({
    message: " user removed",
  });
});

export const getUserById = ayscHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not Found");
  }

  res.json(user);
});

export const updateUser = ayscHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not Found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin;

  const updatedUser = await user.save();

  res.json(updatedUser);
});
