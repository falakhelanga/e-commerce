import orderModel from "./models/orderModel.js";
import productsModel from "./models/productsModel.js";
import userModel from "./models/userModel.js";
import products from "./data/products.js";
import users from "./data/users.js";
import dotenv from "dotenv";
import dbConnect from "./mongoose/dbConnection.js";
import mongoose from "mongoose";

dotenv.config();

dbConnect();

const importData = async () => {
  try {
    await orderModel.deleteMany();
    await userModel.deleteMany();
    await productsModel.deleteMany();

    const createdUsers = await userModel.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((item) => {
      return { ...item, user: adminUser };
    });

    const createProducts = await productsModel.insertMany(sampleProducts);

    console.log("data importerd");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await orderModel.deleteMany();
    await userModel.deleteMany();
    await productsModel.deleteMany();

    console.log("data destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
