import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const dbConnect = asyncHandler(async () => {
  await mongoose.connect(process.env.LOCAL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("connected to db");

  // const error = new Error(err);
  // next(error);
});

export default dbConnect;
