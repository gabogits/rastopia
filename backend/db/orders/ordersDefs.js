const ordersDefs = `type Order {
    id: ID
    order: [ItemOrder]
    total: Float
    client: Client
    status: StatusOrder
    delivery: String
    created: String
  }

  type ItemOrder {
    id: ID
    quantity: Int
    name: String
    price: Float
    size: String
    photos: [photoProductGroup]
  }

  input OrderInput {
    order: [ItemOrderInput]
    client: ID
  }
  input OrderUpdateInput {
    status: StatusOrder
  }
  enum StatusOrder {
    PENDIENTE
    ENVIADO
    ENTREGADO
    ERROR
  }
  input ItemOrderInput {
    id: ID
    quantity: Int
    name: String
    price: Float
    size: String
    photos: [photoGroup]
  }
  input OrdersFilterInput {
    status: String
    limit: Int
    skip: Int
  }
  `;

module.exports = ordersDefs;
