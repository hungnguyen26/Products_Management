const Cart = require("../../models/carts.model")
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
