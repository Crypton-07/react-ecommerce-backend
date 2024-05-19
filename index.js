// Packages

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Middleware router

const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const brandRouter = require("./routes/brandRouter");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const server = express();

// Middleware

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); //? To parse req.body
server.use("/products", productRouter.router);
server.use("/categories", categoryRouter.router);
server.use("/brands", brandRouter.router);
server.use("/users", userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", orderRouter.router);

// Main to start the server as well as connect to mongodb

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce");
  console.log("Database connected");
}

server.get("/", (req, res) => {
  res.json({ status: "Success" });
});

server.listen(8085, () => {
  console.log("Server started @ 8085");
});

main().catch((err) => console.log(err));
