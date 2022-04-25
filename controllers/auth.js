const { request, response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
        ok: false,
      });
    }
    if (!user.status) {
      return res.status(400).json({
        msg: "Usuario inactivo",
        ok: false,
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
        ok: false,
      });
    }

    const token = await generateJWT(user._id);

    res.json({
      msg: "Login realizado con éxito",
      ok: true,
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Usuario o contraseña incorrectos",
      ok: false,
    });
  }
};

module.exports = { login };
