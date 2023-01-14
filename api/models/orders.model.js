const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  }
}, {timestamps: true});

module.exports = mongoose.models.orders || mongoose.model("orders", ordersSchema);