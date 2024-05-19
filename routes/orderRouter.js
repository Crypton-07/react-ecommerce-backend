const express = require("express");
const {
  createOrder,
  fetchOrderByUser,
  updateOrder,
  deleteOrder,
  fetchAllOrders,
} = require("../controller/orderController");

const router = express.Router();

router
  .post("/", createOrder)
  .get("/user/:userId", fetchOrderByUser)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder)
  .get("/", fetchAllOrders);

exports.router = router;
