const { gql } = require("apollo-server-express");
const imageDefs = require("./image/imageDefs");
const ordersDefs = require("./orders/ordersDefs");
const productDefs = require("./products/productDefs");
const clientDefs = require("./users/clientDefs");
// const { gql } = require("apollo-server");

const typeDefs = gql`
  ${clientDefs}

  ${productDefs}

  ${ordersDefs}

  ${imageDefs}

  type Query {
    #client
    getClient(id: ID!): Client
    getAuth: Client
    #product
    getProducts: [Product]
    getProduct(id: ID!): Product
    getProductsFilter(input: ProductFilterInput): [Product]

    getOrders(input: OrdersFilterInput): [Order]
    getOrdersByClient(id: ID!): [Order]
    getOrder(id: ID!): Order
  }

  type Mutation {
    #client
    newClient(input: ClientInput): Client
    authUser(input: AuthInput): Token
    updateClient(id: ID!, input: ClientUpdateInput): Client

    #product
    newProduct(input: ProductInput): Product
    editProduct(id: ID!, input: ProductUpdateInput): Product
    deleteProduct(id: ID!): String

    #order
    newOrder(input: OrderInput): Order
    editOrder(id: ID!, input: OrderUpdateInput): Order
    deleteOrder(id: ID!): String

    uploadImage(
      file: String!
      uploadOptions: UploadOptionsInput
    ): UploadedImage!
  }
`;

module.exports = typeDefs;
