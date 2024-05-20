const Cart = require("../../models/carts.model");
const Product = require("../../models/products-model");
const Order = require("../../models/orders.model");
const productHelper = require("../../helpers/product");

// [GET] /checkout
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartID;

  const cart = await Cart.findOne({
    _id: cartId,
  });

  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const product_id = item.product_id;

      const productInfo = await Product.findOne({
        _id: product_id,
      });

      productInfo.priceNew = productHelper.priceNewProduct(productInfo);

      item.productInfo = productInfo;

      item.totalPrice = item.quantity * productInfo.priceNew;
    }
  }

  cart.totalPrice = cart.products.reduce((sum, item) => {
    return sum + item.totalPrice;
  }, 0);
  res.render("client/pages/checkout/index.pug", {
    pageTitle: "Đặt hàng",
    cartDetail: cart,
  });
};

// [POST] /checkout/order
module.exports.order = async (req, res) => {
  const cart_id = req.cookies.cartID;
  const userInfo = req.body; // form gửi lên ten, sdt, diachi

  const cart = await Cart.findOne({
    _id: cart_id,
  });

  let products = [];

  for (const product of cart.products) {
    const objectProduct = {
      product_id: product.product_id,
      price: 0,
      discountPercentage: 0,
      quantity: product.quantity,
    };

    const productInfo = await Product.findOne({
      _id: product.product_id,
    });

    objectProduct.price = productInfo.price; // cập nhật lại giá trong obj objectProduct
    objectProduct.discountPercentage = productInfo.discountPercentage;

    products.push(objectProduct);
  }

  const objectInfo = {
    cart_id: cart_id,
    userInfo: userInfo,
    products: products
  };

  const order = new Order(objectInfo);
  await order.save();       // lưu lại

  await Cart.updateOne({
    _id: cart_id
  },{
    products: []
  })


  res.redirect(`/checkout/success/${order.id}`);
};
