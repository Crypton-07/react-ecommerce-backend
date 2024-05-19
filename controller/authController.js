const { User } = require("../models/user");

exports.createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const doc = await newUser.save();
    res.status(201).json({ id: doc?.id, email: doc?.email, role: doc?.role });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email }).exec();
    if (!findUser) {
      res.status(400).json({ message: "User not found" });
    } else if (
      findUser?.password === req.body.password &&
      findUser?.email === req.body.email
    ) {
      res.status(200).json({
        id: findUser.id,
        email: findUser.email,
        role: findUser.role,
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
