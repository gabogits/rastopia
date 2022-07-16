const Order = require("../../models/Order");
const Product = require("../../models/Product");

module.exports.orderResQuery = {
  getOrders: async (_, { input }, ctx) => {
    console.log(input);
    if (ctx.user.role !== "admin") {
      throw new Error("No puedes ver los pedidos");
    }

    const filter = input.status !== "TODOS" ? { status: input.status } : {};

    const orders = await Order.find(filter)
      .sort({
        _id: -1,
      })
      .populate("client")
      .limit(input.limit)
      .skip(input.skip);
    return orders;
  },
  getOrdersByClient: async (_, { id }, ctx) => {
    if (!ctx.user) {
      throw new Error("No puedes ver los pedidos");
    }

    const clientID = id ? id : ctx.user.id;

    const orders = await Order.find({ client: clientID })
      .sort({
        _id: -1,
      })
      .populate("client");
    return orders;
  },
  getOrder: async (_, { id }, ctx) => {
    if (ctx.user.role !== "admin") {
      throw new Error("No puedes ver el pedido");
    }

    const order = await Order.findById(id).populate("client");

    if (!order) {
      throw new Error("No existe, este pedido");
    }
    return order;
  },
};
module.exports.orderResMutation = {
  newOrder: async (_, { input }, ctx) => {
    const { order } = input;

    let total = 0;

    if (!ctx.user) {
      throw new Error("No puedes dar de alta un pedido");
    }

    for await (const item of order) {
      const { id } = item;
      const product = await Product.findById(id);

      const available = product.quantity.find(
        (elem) => elem.size === item.size
      );

      if (!available) {
        throw new Error(`Producto no disponible`);
      }

      if (item.quantity > available.quantity) {
        throw new Error(
          `Por el momento solo contamos con ${available.quantity} piezas en stock del articulo ${item.name}. Por favor modifica tu compra`
        );
      } else {
        product.quantity = product.quantity.map((p) =>
          p.size === item.size
            ? { ...p, quantity: p.quantity - item.quantity }
            : p
        );
        product.sizes = product.sizes.filter((elm) => {
          if (elm.size === item.size) {
            if (available.quantity - item.quantity !== 0) {
              return elm;
            }
          } else {
            return elm;
          }
        });
        product.quantity = product.quantity.filter((p) => p.quantity !== 0);
        await product.save();

        total = total + item.quantity * item.price;
      }
    }

    input.total = total + 80;

    const orderComplete = await new Order(input);
    await orderComplete.save();
    console.log(orderComplete);
    return orderComplete;
  },
  editOrder: async (_, { id, input }, ctx) => {
    if (ctx.user.role !== "admin") {
      throw new Error("No puedes editar un pedido");
    }

    console.log(id, input, "id e input");

    let order = await Order.findById(id);

    if (!order) {
      throw new Error("No existe el pedido que quieres editar");
    }
    order = await Order.findOneAndUpdate({ _id: id }, input, {
      new: true,
    });

    return order;
  },

  deleteOrder: async (_, { id, input }, ctx) => {
    if (ctx.user.role !== "admin") {
      throw new Error("No puedes eliminar un pedido");
    }

    let order = await Order.findById(id);
    if (!order) {
      throw new Error("No existe el pedido que quieres eliminar");
    }

    order = await Order.findOneAndDelete({ _id: id });

    return "Pedido eliminado";
  },
};
