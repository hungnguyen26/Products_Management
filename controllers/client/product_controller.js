// [GET] product
const Product = require("../../models/products-model")
module.exports.product = async (req, res) => {
    const products = await Product.find({
        status:"active",
        deleted: false
    });
    const newProducts = products.map((item)=>{
        item.priceNew = (item.price *(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })

    console.log(newProducts);
    res.render("client/pages/product/index.pug",{
        pageTitle:"Trang danh sách sản phẩm",
        products: newProducts
    })
}