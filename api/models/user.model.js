const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "אנא הכנס שם"],
    maxLength: [50, "שם לא יכול לעבור 50 אותיות"],
  },
  email: {
    type: String,
    required: [true, "אנא הכנס אימייל"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "אנא הכנס סיסמא"],
    minLength: [6, "הסיסמא צריכה להיות יותר מ6 תווים"],
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