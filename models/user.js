const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  province: {
    type: String,
    required: [true, "El nombre de la provincia es obligatorio"],
  },
  location: {
    type: String,
    required: [true, "El nombre de la localidad es obligatorio"],
  },
  shippingAddress: {
    type: String,
    required: [true, "El nombre de la dirección es obligatorio"],
  },
});
UserSchema.methods.toJSON = function () {
  const { password, __v, ...data } = this.toObject();
  return data;
};
module.exports = model("User", UserSchema);
