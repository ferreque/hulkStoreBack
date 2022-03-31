const { request, response } = require("express");
const Product = require("../models/product");

const productsGet = async (req = request, res = response) => {
  const products = await Product.find({ estado: true })
    .populate("user", "nombre email")
    .populate("categorie", "nombre");
  res.json({
    msg: "GET productos",
    products,
  });
};

const productGet = async (req = request, res = response) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json({
    msg: "GET producto",
    product,
  });
};

const productsPost = async (req = request, res = response) => {
  const { estado, ...body } = req.body;

  data = {
    ...body,
    user: req.usuario._id,
  };

  const product = new Product(data);

  await product.save();

  res.json({
    msg: `Nuevo producto "${product.nombre}" creado`,
    product,
  });
};
const productsPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...rest } = req.body;

  const product = await Product.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "Producto editado",
    product,
  });
};
const productsDelete = async (req = request, res = response) => {
  const id = req.params.id;

  const product = await Product.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    msg: "Producto eliminado",
    product,
  });
};

module.exports = {
  productsGet,
  productGet,
  productsPost,
  productsPut,
  productsDelete,
};
