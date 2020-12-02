import OrderModel from "../../models/orderModel.js";
import asychHandler from "express-async-handler";

export const postAddOrder = asychHandler(async (req, res, next) => {
  const {
    orderItems,

    shippingAdress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const orderModel = new OrderModel({
    user: req.user._id,
    orderItems,

    shippingAdress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdModel = await orderModel.save();
  res.json(createdModel);
});

export const getOrder = asychHandler(async (req, res, next) => {
  const id = req.params.id;

  const order = await OrderModel.findById(id).populate("user", "name email");

  if (!order) {
    res.status(404);
    throw new Error("the order not found");
  }

  res.json(order);
});

export const updateOrder = asychHandler(async (req, res, next) => {
  console.log("lll");
  const id = req.params.id;

  const order = await OrderModel.findById(id);

  if (!order) {
    res.status(404);
    throw new Error("the order not found");
  }

  order.delieveredAt = Date.now();
  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResul = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_adress: req.body.payer.email_adress,
  };

  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

export const getMyOrders = asychHandler(async (req, res, next) => {
  const orders = await OrderModel.find({ user: req.user._id });
  console.log("req.user._id");

  if (!orders) {
    res.status(404);
    throw new Error("Order not Found");
  }

  res.json(orders);
});
