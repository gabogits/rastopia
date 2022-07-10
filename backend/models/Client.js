const mongoose = require("mongoose");

const ClientSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  lastname: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  address: {
    type: String,
    require: false,
    default: "",
  },
  references: {
    type: String,
    require: false,
    default: "",
  },
  phone: {
    type: String,
    require: false,
    default: "",
  },
  orders: {
    type: Array,
    require: false,
  },

  role: {
    type: String,
    default: "client",
  },

  created: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Client", ClientSchema);
