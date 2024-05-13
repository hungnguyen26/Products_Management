const Product_Category = require("../../models/products-category.model");
const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/create-tree");

module.exports.category = async (req, res, next) => {
  const ProductDanhmuc = await Product_Category.find({
    deleted: false,
  });
  const newProductDanhmuc = createTreeHelper.tree(ProductDanhmuc);
//   console.log(newProductDanhmuc);
  res.locals.layoutProductDanhmuc = newProductDanhmuc;
  next();
};
