const Client = require("../../models/Client");
const bcryptjs = require("bcryptjs");
const { createToken } = require("../../utils/");

module.exports.clientResQuery = {
  getAuth: async (_, {}, ctx) => {
    return ctx.user;
  },
  getClient: async (_, { id }) => {
    const client = await Client.findById(id);
    if (!client) {
      throw new Error("El usuario no existe");
    }
    return client;
  },
};
module.exports.clientResMutation = {
  newClient: async (_, { input }) => {
    const { email, password } = input;
    const clientExists = await Client.findOne({ email });

    if (clientExists) {
      throw new Error("El usuario ya existe");
    }
    const salt = await bcryptjs.genSalt(10);
    input.password = await bcryptjs.hash(password, salt);

    try {
      const client = new Client(input);
      client.save();
      return client;
    } catch (error) {
      console.log("error", error);
    }
  },
  authUser: async (_, { input }) => {
    const { email, password } = input;
    const clientExists = await Client.findOne({ email });

    if (!clientExists) {
      throw new Error("El usuario no existe");
    }
    const passwordCorrect = await bcryptjs.compare(
      password,
      clientExists.password
    );

    if (!passwordCorrect) {
      throw new Error("El password es incorrecto");
    }

    return {
      token: createToken(clientExists, process.env.SECRETA, "24H"),
    };
  },
  updateClient: async (_, { id, input }, ctx) => {
    let client = await Client.findById(id);

    if (!client) {
      throw new Error("El usuario no existe");
    }

    if (ctx.user.id !== id) {
      throw new Error("No puedes realizar esta acción");
    }

    client = await Client.findOneAndUpdate({ _id: id }, input, {
      new: true,
    });

    return client;
  },
};
