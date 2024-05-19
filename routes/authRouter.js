const express = require("express");
const { createUser, loginUser } = require("../controller/authController");
const router = express.Router();
// User already added in base path
router.post("/signup", createUser).post("/login", loginUser);

exports.router = router;
