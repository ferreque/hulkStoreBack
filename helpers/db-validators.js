const User = require("../models/user");
const Categorie = require("../models/categorie");
const Porduct = require("../models/product");

const emailExiste = async (email = "") => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email ${email} ya se encuantra registrado`);
  }
};

const idExiste = async (id) => {
  const existeUsuario = await User.findById(id);
  if (!existeUsuario) {
    throw new Error("El id de usuario no existe");
  }
};

const categoriaIdExiste = async (id) => {
  const existeIdCategoria = await Categorie.findById(id);

  if (!existeIdCategoria) {
    throw new Error(`El id de la categoria no existe`);
  }
};

const nombreCategoriaExiste = async (nombre = "") => {
  const existeNombreCategoria = await Categorie.findOne({ nombre });
  if (existeNombreCategoria) {
    throw new Error(`La categoría ${nombre} ya existe`);
  }
};

const productoIdExiste = async (id) => {
  const existeIdProducto = await Porduct.findById(id);

  if (!existeIdProducto) {
    throw new Error(`El id del producto no existe`);
  }
};

const nombreProductoExiste = async (nombre = "") => {
  const existeNombreProducto = await Porduct.findOne({ nombre });
  if (existeNombreProducto) {
    throw new Error(`El producto ${nombre} ya existe`);
  }
};

module.exports = {
  emailExiste,
  idExiste,
  categoriaIdExiste,
  nombreCategoriaExiste,
  productoIdExiste,
  nombreProductoExiste,
};
