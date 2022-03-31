const { request, response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
        ok: fasle,
      });
    }
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario inactivo",
        ok: fasle,
      });
    }
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
        ok: false,
      });
    }

    const token = await generarJWT(usuario._id);

    res.json({
      msg: "Login realizado con éxito",
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "No hay token en la petición, hablar con admin",
      ok: false,
    });
  }
};

module.exports = { login };
