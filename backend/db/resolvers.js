const { orderResQuery, orderResMutation } = require("./orders/ordersResolvers");
const {
  productResQuery,
  productResMutation,
} = require("./products/productResolvers");
const {
  clientResQuery,
  clientResMutation,
} = require("./users/clientResolvers");
const { imageResMutation } = require("./image/imageResolvers");

const resolvers = {
  Query: {
    ...clientResQuery,
    ...productResQuery,
    ...orderResQuery,
  },
  Mutation: {
    ...clientResMutation,
    ...productResMutation,
    ...orderResMutation,
    ...imageResMutation,
  },
};

module.exports = resolvers;
