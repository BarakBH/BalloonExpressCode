const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  earning: {
    type: Number,
  }
});

module.exports = mongoose.models.stats || mongoose.model("stats", statsSchema);