const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  estado: {
    type: String,
    enum: ["PENDIENTE", "ENVIADO", "ENTREGADO"],
    default: "PENDIENTE",
    required: true,
  },
  cancelar: {
    type: Boolean,
    default: false,
  },
  precioTotal: {
    type: Number,
    default: 0,
    required: true,
  },
  cantidad: {
    type: Number,
    default: 1,
    required: true,
  },
  provincia: {
    type: String,
    required: [true, "La provincia es obligatoria"],
  },
  localidad: {
    type: String,
    required: [true, "La localidad es obligatoria"],
  },
  codigoPostal: {
    type: Number,
    required: [true, "El codigo postal es obligatorio"],
  },
  direccionEnvio: {
    type: String,
    required: [true, "La direccion es obligatoria"],
  },
});
OrderSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};
module.exports = model("Order", OrderSchema);
