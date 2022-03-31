const { request, response } = require("express");
const Categorie = require("../models/categorie");

const categoriesGet = async (req = request, res = response) => {
  const categories = await Categorie.find({ estado: true }).populate(
    "user",
    "nombre email"
  );

  res.json({
    msg: "GET categorias",
    categories,
  });
};
const categorieGet = async (req = request, res = response) => {
  const id = req.params.id;
  const categorie = await Categorie.findById(id);
  res.json({
    mge: "GET categoria",
    categorie,
  });
};
const categoriesPost = async (req = request, res = response) => {
  const { nombre } = req.body;

  const data = {
    nombre,
    user: req.usuario._id,
  };

  const categorie = new Categorie(data);

  await categorie.save();

  res.json({
    msg: `Nueva categoria ${nombre} creada`,
    categorie,
  });
};
const categoriesPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...rest } = req.body;

  const categorie = await Categorie.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "Categoria editada",
    categorie,
  });
};
const categoriesDelete = async (req = request, res = response) => {
  const id = req.params.id;

  const categorie = await Categorie.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    msg: "Categoría eliminada",
    categorie,
  });
};

module.exports = {
  categoriesGet,
  categorieGet,
  categoriesPost,
  categoriesPut,
  categoriesDelete,
};
