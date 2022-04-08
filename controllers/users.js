const { request, response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const usersGet = async (req = request, res = response) => {
  const usuarios = await User.find({ estado: true });
  res.json({
    msg: "GET users",
    usuarios,
  });
  console.log(usuarios);
};
const userGet = async (req = request, res = response) => {
  const id = req.params.id;
  const usuario = await User.findById(id);
  res.json({
    msg: "GET user",
    usuario,
  });
};
const usersPost = async (req = request, res = response) => {
  const { nombre, email, password, rol, provincia, localidad, direccionEnvio } =
    req.body;

  const usuario = new User({
    nombre,
    email,
    password,
    rol,
    provincia,
    localidad,
    direccionEnvio,
  });

  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    msg: "Usuario creado",
    usuario,
  });
};
const usersPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, email, rol, password, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await User.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "PUT user",
    usuario,
  });
};
const usersDelete = async (req = request, res = response) => {
  const id = req.params.id;

  const usuario = await User.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    msg: "DELETE user",
    usuario,
  });
};

module.exports = {
  usersGet,
  userGet,
  usersPost,
  usersPut,
  usersDelete,
};
