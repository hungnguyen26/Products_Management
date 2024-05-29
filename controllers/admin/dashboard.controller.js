const Product_Category = require("../../models/products-category.model");
const Product = require("../../models/products-model");
const Account = require("../../models/accounts.model");
const User = require("../../models/users.model");

// [GET] admin/dashboard
module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryProduct: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    product: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    account: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    user: {
      total: 0,
      active: 0,
      inactive: 0,
    },
  };
  //categoryProduct
  statistic.categoryProduct.total = await Product_Category.countDocuments({
    deleted:false
  })
  statistic.categoryProduct.active = await Product_Category.countDocuments({
    status: "active",
    deleted:false
  })
  statistic.categoryProduct.inactive = await Product_Category.countDocuments({
    status: "inactive",
    deleted:false
  })

  //product
  statistic.user.total = await User.countDocuments({
    deleted:false
  })
  statistic.user.active = await User.countDocuments({
    status: "active",
    deleted:false
  })
  statistic.user.inactive = await User.countDocuments({
    status: "inactive",
    deleted:false
  })

  // account
  statistic.account.total = await Account.countDocuments({
    deleted:false
  })
  statistic.account.active = await Account.countDocuments({
    status: "active",
    deleted:false
  })
  statistic.account.inactive = await Account.countDocuments({
    status: "inactive",
    deleted:false
  })

  //user
  statistic.product.total = await Product.countDocuments({
    deleted:false
  })
  statistic.product.active = await Product.countDocuments({
    status: "active",
    deleted:false
  })
  statistic.product.inactive = await Product.countDocuments({
    status: "inactive",
    deleted:false
  })



  res.render("admin/pages/dashboard/index.pug", {
    pageTitle: "Trang tổng quan",
    statistic: statistic,
  });
};
