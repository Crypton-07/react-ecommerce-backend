const express = require("express");
const {
  fetchCategories,
  createCategory,
} = require("../controller/categoryCotroller");
const router = express.Router();

router.post("/", createCategory).get("/", fetchCategories); // Category already added in base path

exports.router = router;
