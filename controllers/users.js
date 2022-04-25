const { request, response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const getUsers = async (req = request, res = response) => {
  const users = await User.find({ status: true });
  res.json({
    msg: "Usuarios obtenidos",
    users,
  });
};
const getOneUser = async (req = request, res = response) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.json({
    msg: "Usuario obtenido",
    user,
  });
};
const createUser = async (req = request, res = response) => {
  const { name, email, password, rol, province, location, shippingAddress } =
    req.body;

  const user = new User({
    name,
    email,
    password,
    rol,
    province,
    location,
    shippingAddress,
  });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.json({
    msg: "Usuario creado",
    user,
  });
};
const editUser = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, email, rol, password, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "Usuario editado",
    user,
  });
};
const deleteUser = async (req = request, res = response) => {
  const id = req.params.id;

  const user = await User.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json({
    msg: "Usuario eliminado",
    user,
  });
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  editUser,
  deleteUser,
};
