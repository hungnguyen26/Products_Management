const Cart = require("../../models/carts.model")
const Product = require("../../models/products-model")
const productHelper = require("../../helpers/product")

// [GET] /checkout
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartID;

    const cart = await Cart.findOne({
        _id: cartId
    })

    if(cart.products.length > 0){
        for (const item of cart.products) {   

            const product_id = item.product_id;

            const productInfo = await Product.findOne({
                _id: product_id
            })

            productInfo.priceNew = productHelper.priceNewProduct(productInfo);

            item.productInfo = productInfo;

            item.totalPrice = item.quantity*productInfo.priceNew;   
        }
    }
    
    cart.totalPrice = cart.products.reduce((sum, item)=>{
        return sum + item.totalPrice;
    },0)
    res.render("client/pages/checkout/index.pug", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
      });
};


