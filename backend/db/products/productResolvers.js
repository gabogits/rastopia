const Product = require("../../models/Product");

module.exports.productResQuery = {
  getProducts: async () => {
    const products = await Product.find({});
    return products;
  },
  getProductsFilter: async (_, { input }) => {
    let filter = {};

    const keys = Object.keys(input);

    for (const key of keys) {
      if (input[key] !== "") {
        if (key === "genre" || key === "category") {
          filter[key] = input[key];
        }
        if (key === "price") {
          filter[key] = { $lte: input[key] };
        }
        if (key === "sizes") {
          filter["sizes.size"] = {
            $in: input.sizes.map((item) => item.size),
          };
        }
      }
    }

    // {genre, category,  price:  'sizes.size': {$in:  sizes.map(item => item.size ) }  }

    const products = await Product.find(filter)
      .limit(input.limit)
      .skip(input.skip);

    return products;
  },
  getProduct: async (_, { id }) => {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("El producto no existe");
    }

    return product;
  },
};
module.exports.productResMutation = {
  newProduct: async (_, { input }, ctx) => {
    if (ctx.user.role !== "admin") {
      throw new Error("No puedes subir productos");
    }
    const product = await Product(input);
    const result = await product.save();

    return result;
  },
  editProduct: async (_, { id, input }, ctx) => {
    let product = await Product.findById(id);

    if (!product) {
      throw new Error("El producto no existe");
    }

    if (ctx.user.role !== "admin") {
      throw new Error("No puedes actualizar productos");
    }
    product = await Product.findOneAndUpdate({ _id: id }, input, {
      new: true,
    });

    return product;
  },
  deleteProduct: async (_, { id }, ctx) => {
    let product = await Product.findById(id);

    if (!product) {
      throw new Error("El producto no existe");
    }

    if (!ctx.user && ctx.user.role !== "admin") {
      throw new Error("No puedes actualizar productos");
    }
    console.log(product);
    product = await Product.findOneAndDelete({ _id: id });

    return "Producto eliminado";
  },
};
