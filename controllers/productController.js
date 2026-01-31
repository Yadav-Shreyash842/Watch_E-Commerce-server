const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

module.exports = { getProducts, addProduct };
