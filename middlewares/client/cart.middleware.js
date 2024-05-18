const Cart = require("../../models/carts.model")

module.exports.cartID = async (req,res, next)=>{

    if(!req.cookies.cartID){
        const cart = new Cart();
        await cart.save();
        const exTime = 1000 * 60 * 60 * 24 * 365;   // lấy ra thời gian 1 năm
        res.cookie("cartID",cart.id,{ expires: new Date(Date.now() + exTime)});  // cookie hết hạn sau 1 năm nữa
    }else{
        // khi đã có giỏ hàng
    }
    next();
}