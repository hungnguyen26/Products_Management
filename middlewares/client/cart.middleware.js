const Cart = require("../../models/carts.model")

module.exports.cartID = async (req,res, next)=>{

    if(!req.cookies.cartID){
        const cart = new Cart();
        await cart.save();
        const exTime = 1000 * 60 * 60 * 24 * 365;   // lấy ra thời gian 1 năm
        res.cookie("cartID",cart.id,{ expires: new Date(Date.now() + exTime)});  // cookie hết hạn sau 1 năm nữa
    }else{
        // khi đã có giỏ hàng
        const cart = await Cart.findOne({    // lấy ra id giỏ hàng
            _id: req.cookies.cartID
        })

        cart.totalQuantity = cart.products.reduce((sum, item)=>{     // thêm totalQuantity cho cart
            return sum + item.quantity;
        },0)                // 0 là giá trị khởi tạo

        res.locals.miniCart = cart;    // tạo biến toàn cục giỏ hàng
    }
    next();
}