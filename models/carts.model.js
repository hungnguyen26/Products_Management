const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: String, // biết giỏ hàng của ai
    products: [   // những sản phẩm đã thêm vào giỏ hàng
      {
        product_id: String,
        quantity: Number
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;
