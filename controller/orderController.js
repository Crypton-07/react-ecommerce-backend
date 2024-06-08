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
  const { id } = req.user;
  try {
    const fetchOrder = await Order.find({ user: id });
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

exports.fetchAllOrders = async (req, res) => {
  console.log(req);
  let query = Order.find({});
  let totalOrderQuery = Order.find({});
  //Todo : Here sorting is happening on actual price later we will make sorting based on discounted price.
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalOrderQuery = totalOrderQuery.find({
      [req.query._sort]: req.query._order,
    });
    // console.log(query);
  }
  if (req.query._page && req.query._per_page) {
    const pageSize = req.query._per_page;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  const totalDocs = await totalOrderQuery.count().exec();

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};
