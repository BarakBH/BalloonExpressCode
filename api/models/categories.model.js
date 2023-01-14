const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    maxLength: [50],
  },
  slug: {
    type: String,
    required: [true, "Slug required"],
    unique: true,
  },
  products: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: String,
  },
}, {timestamps: true});

module.exports = mongoose.models.categories || mongoose.model("categories", categoriesSchema);