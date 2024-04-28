const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  updateProduct,
  fetchProductById,
} = require("../controller/productController");
const router = express.Router();
// Product already added in base path
router
  .post("/", createProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct);

exports.router = router;
