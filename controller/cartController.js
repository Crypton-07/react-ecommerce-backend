const { Cart } = require("../models/cart");

exports.addToCart = async (req, res) => {
  const { id } = req.user;
  const cartItem = new Cart({ ...req.body, user: id });
  try {
    const doc = await cartItem.save();
    const result = await doc.populate("product");
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.fetchCartItemsByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const cartItem = await Cart.find({ user: id }).populate("product");
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.updateCartItem = async (req, res) => {
  const { id } = req.params;
  // console.log(req.query);
  try {
    const cartItem = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    const result = await cartItem.populate("product");
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const cartItem = await Cart.findByIdAndDelete(id);
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(400).json(error);
  }
};
