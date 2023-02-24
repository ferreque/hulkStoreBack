const { request, response } = require("express");
const Product = require("../models/product");

const getProducts = async (req = request, res = response) => {
  const products = await Product.find({ status: true })
    .populate("user", "name email")
    .populate("categorie", "name");
  res.json({
    msg: "GET productos",
    products,
  });
};

const getOneProduct = async (req = request, res = response) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json({
    msg: "GET producto",
    product,
  });
};

const createProduct = async (req = request, res = response) => {
  const { status, ...body } = req.body;
  data = {
    ...body,
    user: req.user._id,
  };

  const product = new Product(data);

  await product.save();

  res.json({
    msg: `Nuevo producto "${product.name}" creado`,
    product,
  });
};
const editProduct = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...rest } = req.body;

  const product = await Product.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "Producto editado",
    product,
  });
};
const deleteProduct = async (req = request, res = response) => {
  const id = req.params.id;

  const product = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json({
    msg: "Producto eliminado",
    product,
  });
};

module.exports = {
  getProducts,
  getOneProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
