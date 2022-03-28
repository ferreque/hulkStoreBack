const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre de usuario es obligatorio"],
  },
  email: {
    type: String,
    require: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    require: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("User", UserSchema);
