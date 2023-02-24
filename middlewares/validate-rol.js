const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const isAdminRole = async (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar rol sin validar el token",
    });
  }
  const { rol, name } = req.user;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador`,
    });
  }
  next();
};
module.exports = { isAdminRole };
