const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  user: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("Otp", otpSchema);