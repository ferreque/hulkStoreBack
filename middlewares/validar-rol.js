const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const esAdminRole = async (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar rol sin validar el token",
    });
  }
  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador`,
    });
  }
  next();
};
module.exports = { esAdminRole };
