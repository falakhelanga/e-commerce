import express from "express";
import * as shopControllers from "../../controllers/shopControllers/productsControllers.js";

const router = express.Router();

router.get("/api/products", shopControllers.getProducts);
router.get("/api/product/:id", shopControllers.getProduct);

export default router;
