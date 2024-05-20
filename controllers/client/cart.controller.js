const Cart = require("../../models/carts.model")
const Product = require("../../models/products-model")
const productHelper = require("../../helpers/product")

// [GET] /cart
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartID;

    const cart = await Cart.findOne({
        _id: cartId
    })

    if(cart.products.length > 0){
        for (const item of cart.products) {    // mỗi item là 1 object

            const product_id = item.product_id;

            const productInfo = await Product.findOne({
                _id: product_id
            })

            productInfo.priceNew = productHelper.priceNewProduct(productInfo);

            item.productInfo = productInfo;

            item.totalPrice = item.quantity*productInfo.priceNew;   // tổng tiền của mỗi sản phẩm
        }
    }
    
    cart.totalPrice = cart.products.reduce((sum, item)=>{
        return sum + item.totalPrice;
    },0)


    res.render("client/pages/cart/index.pug", {
        pageTitle: "Giỏ hàng",
        cartDetail: cart
      });
};


// [POST] /cart/add/:productID
module.exports.addPost = async (req, res) => {
    const cartID = req.cookies.cartID;
    const productID = req.params.productID;
    const quantity = parseInt(req.body.quantity);

    const cart = await Cart.findOne({    // tìm ra giỏ hàng
        _id: cartID
    })

    const exitsProductInCart = cart.products.find(item => item.product_id == productID);   // tìm ra từng sản phẩm có id bằng id gửi lên
     
    if(exitsProductInCart){                 // nếu đã có sản phẩm thì chỉ cần cập nhật số lượng
        const newQuantity = quantity + exitsProductInCart.quantity;

        await Cart.updateOne({
            _id:cartID,
            'products.product_id': productID
        },{
            'products.$.quantity': newQuantity
        })
    }else{
        const objectCart = {
            product_id: productID,
            quantity: quantity
          }
    
        await Cart.updateOne({
            _id: cartID          // Tìm id giỏ hàng muốn cập nhật
        },
        {
            $push: { products: objectCart}  
        })
    }

    

    req.flash("success","Thêm sản phẩm vào giỏ hàng thành công !")

    res.redirect("back")
};

// [GET] /cart/delete/:productID
module.exports.delete = async (req, res) => {
    const cartID = req.cookies.cartID;
    const product_idRemove = req.params.productID;   // tìm id product cần xóa

    await Cart.updateOne({
        _id: cartID
    },{
        "$pull":{ products:{"product_id": product_idRemove }}
    })

    req.flash("success","Đã xóa sản phẩm khỏi giỏ hàng")

    res.redirect("back")

}

// [GET] /cart/update/:productID/:quantity
module.exports.update = async (req, res) => {
    const cartID = req.cookies.cartID;
    const product_idUpdate = req.params.productID;   // tìm id product cần update
    const quantity = req.params.quantity;

    await Cart.updateOne({
        _id:cartID,
        'products.product_id': product_idUpdate
    },{
        'products.$.quantity': quantity
    })

    req.flash("success","Đã cập nhật số lượng!!")

    res.redirect("back")

}