const express = require("express");
const { fetchbrands, createBrand } = require("../controller/brandContoller");
const router = express.Router();

router.post("/", createBrand).get("/", fetchbrands); // Brands already added in base path

exports.router = router;
