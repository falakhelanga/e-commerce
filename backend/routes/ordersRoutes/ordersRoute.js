import express from "express";
import * as ordersControllers from "../../controllers/ordersControllers/ordersContrpllers.js";
import authMiddleWare from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleWare, ordersControllers.postAddOrder);
router.route("/myorders").get(authMiddleWare, ordersControllers.getMyOrders);
router.route("/:id").get(authMiddleWare, ordersControllers.getOrder);

router.route("/:id/pay").put(authMiddleWare, ordersControllers.updateOrder);

export default router;
