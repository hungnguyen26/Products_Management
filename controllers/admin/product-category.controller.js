const Product_Category = require("../../models/products-category.model");
const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/create-tree");

const Account = require("../../models/accounts.model");

// [GET] /admin/products-category
module.exports.product = async (req, res) => {
  let find = {
    deleted: false,
  };

  const danhmuc = await Product_Category.find(find);
  const newDanhmuc = createTreeHelper.tree(danhmuc);

  for (const dm of danhmuc) {
    // lấy ra thông tin người cập nhật gần nhất
    const updateBy = dm.updateBy[dm.updateBy.length - 1];
    if (updateBy) {
      const userUpdate = await Account.findOne({
        _id: updateBy.accountID,
      });

      updateBy.accfullName = userUpdate.fullName;
    }
  }

  res.render("admin/pages/products-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    danhmuc: newDanhmuc,
  });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const danhmuc = await Product_Category.find(find);

  const newDanhmuc = createTreeHelper.tree(danhmuc);

  // console.log(newDanhmuc);

  res.render("admin/pages/products-category/create.pug", {
    pageTitle: "Tạo danh mục sản phẩm",
    danhmuc: newDanhmuc,
  });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  // const nhomquyen = res.locals.role.nhomQuyen;
  // if(nhomquyen.includes("products-category_create")){
  //   console.log("Có quyền");
  // }else{
  //   res.send("403");
  //   return;
  // }

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

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Product_Category.findOne({
      deleted: false,
      _id: id,
    });

    const danhmuc = await Product_Category.find({
      deleted: false,
    });

    const newDanhmuc = createTreeHelper.tree(danhmuc);

    res.render("admin/pages/products-category/edit.pug", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data: data,
      danhmuc: newDanhmuc,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};

// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

  req.body.position = parseInt(req.body.position);
  const updated = {
    accountID: res.locals.user.id,
    updateAt: new Date(),
  };
  await Product_Category.updateOne(
    {
      _id: id,
    },
    {
      ...req.body, // lấy ra những phần tử cũ
      $push: { updateBy: updated }, // push vào mảng updateBy
    }
  );
  res.redirect("back");
};

// [GET] /admin/products-category/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const danhmuc = await Product_Category.findOne(find);
    // console.log(danhmuc);
    res.render("admin/pages/products-category/detail.pug", {
      pageTitle: danhmuc.title,
      danhmuc: danhmuc,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};

// [GET] /admin/products-category/delete/:id
module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await Product_Category.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );

  req.flash("success", `Xóa thành công  sản phẩm!`);
  res.redirect("back");
};
