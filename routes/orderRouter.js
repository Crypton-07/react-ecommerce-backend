const express = require("express");
const {
  createOrder,
  fetchOrderByUser,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

const router = express.Router();

router
  .post("/", createOrder)
  .get("/", fetchOrderByUser)
  .patch("/:id", updateOrder)
  .delete("/:id", deleteOrder);

exports.router = router;
