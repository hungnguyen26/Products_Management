const Product = require("../../models/products-model")
const ProductsHelper = require("../../helpers/product");
// [GET] /
module.exports.home = async (req, res) => {
  // lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted:false,
    status:"active"
  })
  // end lấy ra sản phẩm nổi bật
  const newProducts = ProductsHelper.priceNewProducts(productsFeatured);
  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    productsFeatured: newProducts
  });
};
