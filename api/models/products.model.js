const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "שם שדה חובה"],
    maxLength: [150],
  },
  slug: {
    type: String,
    required: [true, "Slug required"],
    unique: true,
  },
  sku: {
    type: String,
  },
  quantity: {
    type: Number
  },
  orders: {
    type: Number,
    required: [true, "הזמנה שדה חובה"],
    default: 0,
  },
  thumbnail: {
    type: String,
  },
  shortDesc: {
    type: String,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "סיסמא שדה חובה"],
    default: 0,
  },
  isSale: {
    type: Boolean,
  },
  sale: {
    type: Number
  },
  category: {
    type: Object,
  },
  published: {
    type: Boolean,
    default: false,
  },
  gallery: {
    type: Array,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object
  },
}, {timestamps: true});

module.exports = mongoose.models.products || mongoose.model("products", productsSchema);