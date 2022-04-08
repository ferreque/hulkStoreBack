const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  estado: {
    type: String,
    enum: ["PENDIENTE", "ENVIADO", "ENTREGADO"],
    default: "PENDIENTE",
    required: true,
  },
  pedidoActivo: {
    type: Boolean,
    default: true,
  },
  precioTotal: {
    type: Number,
    default: 0,
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
