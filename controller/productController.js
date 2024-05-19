const { Product } = require("../models/product");

exports.createProduct = async (req, res) => {
  const createProduct = new Product(req.body);
  try {
    const doc = await createProduct.save();
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchAllProducts = async (req, res) => {
  //? filter = {"category": "smartphone"}
  //? sortby = {"sort": "price"}
  //? Pagination = {"page" : 1 , "limit": 10}
  console.log(req);
  let query = Product.find({});
  let totalProductQuery = Product.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductQuery = totalProductQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductQuery = totalProductQuery.find({ brand: req.query.brand });
  }

  //Todo : Here sorting is happening on actual price later we will make sorting based on discounted price.
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductQuery = totalProductQuery.find({
      [req.query._sort]: req.query._order,
    });
    // console.log(query);
  }
  if (req.query._page && req.query._per_page) {
    const pageSize = req.query._per_page;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  const totalDocs = await totalProductQuery.count().exec();

  try {
    const docs = await query.exec();
    res.set("X-Total-Count", totalDocs);
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const fetchProductById = await Product.findById(id);
    res.status(200).json(fetchProductById);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(400).json(error);
  }
};
