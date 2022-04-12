const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  cantidad: {
    type: Number,
    default: 0,
  },
  nombre: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
  },
  categorie: {
    type: Schema.Types.ObjectId,
    ref: "Categorie",
    required: true,
  },
  descripcion: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});
ProductSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};
module.exports = model("Product", ProductSchema);
