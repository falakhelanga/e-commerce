import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asynchandler from "express-async-handler";

const auth = asynchandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    req.user = user;

    next();
  }

  if (!token) {
    res.status(401);
    throw new Error("not authorized");
  }
});
export default auth;

export const isAdminMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);

    throw new Error("this user is not authorized as an admin");
  }
};
