const express = require("express");
const { fetchUserById, updateUser } = require("../controller/userController");
const router = express.Router();
// User already added in base path
router.get("/:id", fetchUserById).patch("/:id", updateUser);

exports.router = router;
