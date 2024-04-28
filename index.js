const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const brandRouter = require("./routes/brandRouter");
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
