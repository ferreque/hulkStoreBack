const User = require("../models/user");

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

module.exports = {
  emailExiste,
  idExiste,
};
