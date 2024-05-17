const Product = require("../../models/products-model");
const productHelper = require("../../helpers/product");

// [GET] /search
module.exports.index = async (req, res) => {
    const key = req.query.keyword;
    let newProducts = [];

    if(key){
        const keyRegex = new RegExp(key,"i");   // i là tìm không phân biệt chữ hoa chữ thường

        const products = await Product.find({
            title: keyRegex,
            deleted:false,
            status:"active"
        });

        newProducts = productHelper.priceNewProducts(products);
    }

    
    res.render("client/pages/search/index.pug", {
        pageTitle: "Kết quả tìm kiếm",
        keyword: key,
        products: newProducts
      });
};
