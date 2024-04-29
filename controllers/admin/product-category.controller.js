const Product_Category = require("../../models/products-category.model");
const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/create-tree");

// [GET] /admin/products-category
module.exports.product = async (req, res) => {
  let find = {
    deleted: false,
  };  

  

  const danhmuc = await Product_Category.find(find)
  const newDanhmuc = createTreeHelper.tree(danhmuc);


  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    danhmuc: newDanhmuc
  });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  };



  const danhmuc = await Product_Category.find(find);

  const newDanhmuc = createTreeHelper.tree(danhmuc);

  // console.log(newDanhmuc);

  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Tạo danh mục sản phẩm",
    danhmuc: newDanhmuc
  });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countProducts = await Product_Category.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const productCategory = new Product_Category(req.body); // tạo mới 1 sản phẩm
  await productCategory.save(); // lưu vào database

  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};