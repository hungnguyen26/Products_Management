const Product = require("../../models/products-model");
const ProductsHelper = require("../../helpers/product");

const ProductsCategory = require("../../models/products-category.model");

// [GET] product
module.exports.product = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = ProductsHelper.priceNewProducts(products);

  res.render("client/pages/product/index.pug", {
    pageTitle: "Trang danh sách sản phẩm",
    products: newProducts,
  });
};

// [GET] /product/detail/:slugProduct
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slugProduct,
      status: "active",
    };

    const product = await Product.findOne(find);

    if(product.product_category_id){
      const category = await ProductsCategory.findOne({
        status:"active",
        deleted:false,
        _id: product.product_category_id
      });

      product.category = category;
    }

    product.priceNew =  ProductsHelper.priceNewProduct(product);

    res.render("client/pages/product/detail.pug", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`back`);
  }
};

// [GET] /product/:slugCategory
module.exports.Category = async (req, res) => {
  const category = await ProductsCategory.findOne({
    slug: req.params.slugCategory,
    status: "active",
    deleted: false,
  });

  const getSubCategory = async (parentID) => {
    const subs = await ProductsCategory.find({
      parent_id: parentID,
      status: "active",
      deleted: false,
    });
    let allsubs = [...subs];
    
    for (const sub of subs) {
      const childs = await getSubCategory(sub.id);
      allsubs = allsubs.concat(childs)
    }
    return allsubs;
  };

  const listSubCategory = await getSubCategory(category.id);
  const listSubCategoryId = listSubCategory.map(item=> item.id);
  // console.log(listSubCategoryId);

  const products = await Product.find({
    product_category_id: { $in: [category.id, ...listSubCategoryId] },
    deleted: false,
  }).sort({ position: "desc" });

  const newProducts = ProductsHelper.priceNewProducts(products);

  res.render("client/pages/product/index.pug", {
    pageTitle: category.title,
    products: newProducts,
  });
};
