const Product = require("../../models/products-model")
const ProductsHelper = require("../../helpers/product");
// [GET] /
module.exports.home = async (req, res) => {
  // lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted:false,
    status:"active"
  }).limit(6);

  const newProductsFeatured = ProductsHelper.priceNewProducts(productsFeatured);
  // end lấy ra sản phẩm nổi bật

  // hiển thị danh sách sản phẩm mới nhất
  const productsNew = await Product.find({
    deleted:false,
    status: "active"
  }).sort({position: "desc"}).limit(6); 
  const newProductsnew = ProductsHelper.priceNewProducts(productsNew);

  // end hiển thị danh sách sản phẩm mới nhất

  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsnew
  });
};
