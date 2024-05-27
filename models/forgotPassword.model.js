const mongoose = require("mongoose");
const generate = require("../helpers/generate");

const forgotPasswordPostSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: { 
        type: Date, 
        expires: 180 // sau 3 phút (180s) sẽ xóa
    },
  },
  {
    timestamps: true,
  }
);
const forgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswordPostSchema,
  "forgotPassword"
);

module.exports = forgotPassword;
