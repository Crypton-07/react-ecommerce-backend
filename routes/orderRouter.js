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
  .get("/own", fetchOrderByUser)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder)
  .get("/", fetchAllOrders);

exports.router = router;
