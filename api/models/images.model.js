const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  name: {
    type: String
  },
  size: {
    type: Number
  },
  filename: {
    type: String
  },
  type: {
    type: String,
  },
}, {timestamps: true});

module.exports = mongoose.models.images || mongoose.model("images", imagesSchema);