const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Base de datos online");
  } catch (error) {
    throw new Error("Error en conexion a DB");
  }
};
module.exports = { dbConnection };
