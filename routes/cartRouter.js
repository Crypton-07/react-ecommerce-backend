const express = require("express");
const {
  addToCart,
  fetchCartItemsByUser,
  updateCartItem,
  deleteCartItem,
} = require("../controller/cartController");
const router = express.Router();

router
  .post("/", addToCart)
  .get("/", fetchCartItemsByUser)
  .patch("/:id", updateCartItem)
  .delete("/:id", deleteCartItem);

exports.router = router;
