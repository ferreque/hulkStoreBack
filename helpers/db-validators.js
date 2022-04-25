const User = require("../models/user");
const Categorie = require("../models/categorie");
const Porduct = require("../models/product");
const Order = require("../models/order");

const emailExists = async (email = "") => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email ${email} ya se encuantra registrado`);
  }
};

const idExists = async (id) => {
  const existeUsuario = await User.findById(id);
  if (!existeUsuario) {
    throw new Error("El id de usuario no existe");
  }
};

const idCategoryExists = async (id) => {
  const existeIdCategoria = await Categorie.findById(id);

  if (!existeIdCategoria) {
    throw new Error(`El id de la categoria no existe`);
  }
};
const idProductExists = async (id) => {
  const existeIdProducto = await Porduct.findById(id);

  if (!existeIdProducto) {
    throw new Error(`El id del producto no existe`);
  }
};
const idOrderExists = async (id) => {
  const existeIdPedido = await Order.findById(id);

  if (!existeIdPedido) {
    throw new Error(`El id del pedido no existe`);
  }
};
const nameCategoryExists = async (name = "") => {
  const existeNombreCategoria = await Categorie.findOne({ name });
  if (existeNombreCategoria) {
    throw new Error(`La categoría ${name} ya existe`);
  }
};
const nameProductExists = async (name = "") => {
  const existeNombreProducto = await Porduct.findOne({ name });
  if (existeNombreProducto) {
    throw new Error(`El producto ${name} ya existe`);
  }
};

module.exports = {
  emailExists,
  idExists,
  idCategoryExists,
  idOrderExists,
  nameCategoryExists,
  idProductExists,
  nameProductExists,
};
