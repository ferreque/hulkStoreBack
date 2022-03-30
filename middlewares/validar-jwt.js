const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.KEY);
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(401).json({
        msg: "Token inválido - usuario inexistente",
      });
    }
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token inválido - usuario inactivo",
      });
    }
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Volver a generar Token",
    });
  }
};

module.exports = {
  validarJWT,
};
