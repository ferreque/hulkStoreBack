const { request, response } = require("express");
const Order = require("../models/order");

const ordersGet = async (req = request, res = response) => {
  const orders = await Order.find({ pedidoActivo: true }).populate(
    "cliente",
    "nombre email provincia localidad direccionEnvio"
  );
  res.json({
    msg: "GET pedidos",
    orders,
  });
};

const orderGet = async (req = request, res = response) => {
  const id = req.params.id;
  const order = await Order.findById(id);

  res.json({
    mge: "GET pedido",
    order,
  });
};
const ordersPost = async (req = request, res = response) => {
  const {
    products,
    provincia,
    localidad,
    codigoPostal,
    direccionEnvio,
    precioTotal,
  } = req.body;

  data = {
    provincia,
    localidad,
    codigoPostal,
    direccionEnvio,
    products,
    cliente: req.usuario._id,
    precioTotal,
  };

  const order = new Order(data);

  await order.save();

  res.json({
    msg: "Nuevo pedido generado",
    order,
  });
};
const ordersPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...rest } = req.body;

  const order = await Order.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "Pedido editado",
    order,
  });
};
const ordersDelete = async (req = request, res = response) => {
  const id = req.params.id;

  const order = await Order.findByIdAndUpdate(
    id,
    { pedidoActivo: false },
    { new: true }
  );
  res.json({
    msg: "Pedido eliminado",
    order,
  });
};

module.exports = {
  ordersGet,
  orderGet,
  ordersPost,
  ordersPut,
  ordersDelete,
};
