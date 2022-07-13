const productDefs = `
 type SizeGroup {
    size: String
  }
  type QuantityObj {
    size: String
    quantity: Int
  }
  type Product {
    id: ID
    name: String
    model: String
    description: String
    category: String
    genre: String
    quantity: [QuantityObj]
    price: Float
    sizes: [SizeGroup]
    discount: Int
    photos: [photoProductGroup]
    created: String
  }
  type photoProductGroup {
    photo: String
  }
  input ProductInput {
    name: String!
    model: String!
    description: String
    category: String!
    genre: Genre!
    quantity: [QuantityObjIn]
    price: Float!
    sizes: [SizesAvailables]
    discount: Int
    photos: [photoGroup]
  }
  input photoGroup {
    photo: String
  }
  input SizesAvailables {
    size: String
  }
  input QuantityObjIn {
    size: String
    quantity: Int
  }
  enum Size {
    XS
    S
    M
    L
    XL
    OS
  }
  enum Genre {
    HOMBRE
    MUJER
    UNISEX
  }

  input ProductUpdateInput {
    name: String
    model: String
    description: String
    category: String
    genre: Genre
    quantity: [QuantityObjIn]
    price: Float
    sizes: [SizesAvailables]
    discount: Int
    photos: [photoGroup]
  }
  input ProductFilterInput {
    category: String
    genre: Genre
    sizes: [SizesAvailables]
    price: Float
    limit: Int
    skip: Int
  }
  `;
module.exports = productDefs;
