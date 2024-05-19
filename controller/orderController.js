const { Order } = require("../models/order");

exports.createOrder = async (req, res) => {
  const createOrder = new Order(req.body);
  try {
    const newOrder = await createOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.fetchOrderByUser = async (req, res) => {
  const { user } = req.query;
  console.log(user);
  try {
    const fetchOrder = await Order.find({ user: user });
    console.log(fetchOrder);
    res.status(200).json(fetchOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const updateOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const deleteOrder = await Order.findByIdAndDelete(id);
    res.status(200).json(deleteOrder);
  } catch (error) {
    res.status(400).json(error);
  }
};
