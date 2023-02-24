const { request, response } = require("express");
const Categorie = require("../models/categorie");

const getCategories = async (req = request, res = response) => {
  const categories = await Categorie.find({ status: true }).populate(
    "user",
    "name email"
  );

  res.json({
    msg: "GET categorias",
    categories,
  });
};
const getOneCategorie = async (req = request, res = response) => {
  const id = req.params.id;
  const categorie = await Categorie.findById(id);
  res.json({
    msg: "GET categoria",
    categorie,
  });
};
const createCategorie = async (req = request, res = response) => {
  const { name } = req.body;

  const data = {
    name,
    user: req.user._id,
  };

  const categorie = new Categorie(data);

  await categorie.save();

  res.json({
    msg: `Nueva categoria ${name} creada`,
    categorie,
  });
};
const editCategorie = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...rest } = req.body;

  const categorie = await Categorie.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "Categoria editada",
    categorie,
  });
};
const deleteCategorie = async (req = request, res = response) => {
  const id = req.params.id;

  const categorie = await Categorie.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json({
    msg: "Categoría eliminada",
    categorie,
  });
};

module.exports = {
  getCategories,
  getOneCategorie,
  createCategorie,
  editCategorie,
  deleteCategorie,
};
