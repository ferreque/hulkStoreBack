const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }
  try {
    const { id } = jwt.verify(token, process.env.KEY);
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        msg: "Token inválido - usuario inexistente",
      });
    }
    if (!user.status) {
      return res.status(401).json({
        msg: "Token inválido - usuario inactivo",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Volver a generar Token",
    });
  }
};

module.exports = {
  validateJWT,
};
