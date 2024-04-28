const { brand } = require("../models/brand");

exports.createBrand = async (req, res) => {
  const createBrand = new brand(req.body);
  try {
    const doc = await createBrand.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.fetchbrands = async (req, res) => {
  console.log(req);
  try {
    const brands = await brand.find({}).exec();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json(error);
  }
};
