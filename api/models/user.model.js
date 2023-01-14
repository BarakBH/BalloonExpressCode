const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [50, "Your name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Your password must be longer than 6 characters"],
  },
  role: {
    type: String,
    required: true,
    default: "customer",
  },
  tokens: {
    type: Array,
    default: []
  },
}, {timestamps: true});

module.exports = mongoose.models.users || mongoose.model("users", userSchema);