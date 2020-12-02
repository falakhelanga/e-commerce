import Products from "../../models/productsModel.js";

import asyncHandler from "express-async-handler";

export const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Products.find({});

  res.status(200).json(products);
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const product = await Products.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("produc not found");
  }

  res.status(200).json(product);
});
