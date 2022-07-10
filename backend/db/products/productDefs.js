const productDefs = `
 type SizeGroup {
    size: String
  }
  type Product {
    id: ID
    name: String
    model: String
    description: String
    category: String
    genre: String
    quantity: Int
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
    category: Category!
    genre: Genre!
    quantity: Int!
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

  enum Category {
    Gorras
    Sombreros
    Playeras
    Blusas
    Camisas
    Chamarras
    Sueteres
    Pantalones
    Vestidos
    Faldas
  }

  input ProductUpdateInput {
    name: String
    model: String
    description: String
    category: Category
    genre: Genre
    quantity: Int
    price: Float
    sizes: [SizesAvailables]
    discount: Int
    photos: [photoGroup]
  }
  input ProductFilterInput {
    category: Category
    genre: Genre
    sizes: [SizesAvailables]
    price: Float
    limit: Int
    skip: Int
  }
  `;
module.exports = productDefs;
