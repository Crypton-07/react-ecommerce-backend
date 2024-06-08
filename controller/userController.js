const { User } = require("../models/user");

exports.fetchAllUsers = async (req, res) => {
  try {
    const fetchAllUsers = await User.find({}).exec();
    res.status(200).json(fetchAllUsers);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchUserById = async (req, res) => {
  const { id } = req.user;
  try {
    const fetchUserById = await User.findById(id);
    res.status(200).json({
      id: fetchUserById.id,
      name: fetchUserById.name,
      email: fetchUserById.email,
      address: fetchUserById.address,
      role: fetchUserById.role,
      orders: fetchUserById.orders,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json(error);
  }
};
