const jwt = require("jsonwebtoken");

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(payload, process.env.KEY, { expiresIn: "8h" }, (err, token) => {
      if (err) {
        reject("No se pudo generar token");
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { generateJWT };
