const { category } = require("../models/category");

exports.createCategory = async (req, res) => {
  const createCategory = new category(req.body);
  try {
    const doc = await createCategory.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchCategories = async (req, res) => {
  console.log(req);
  try {
    const categories = await category.find({}).exec();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json(error);
  }
};
