const Product = require("../../models/products-model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

const createTreeHelper = require("../../helpers/create-tree");
const Product_Category = require("../../models/products-category.model");

const Account = require("../../models/accounts.model");

// [GET] /admin/product
module.exports.product = async (req, res) => {
  //đoạn bộ lọc
  const filterStatus = filterStatusHelper(req.query);
  //    console.log(filterStatus);

  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status; // truyển thêm 1 key status vào obj find
  }
  //end đoạn bộ lọc

  // phần tìm kiếm
  const objectSearch = searchHelper(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  // end phần tìm kiếm

  // phần phân trang
  const countProduct = await Product.countDocuments(find); // đếm tổng số sản phẩm
  let objectPagination = paginationHelper(
    {
      limitItem: 4, // sl phần tử mỗi trang
      currentPage: 1,
    },
    req.query,
    countProduct
  );
  // end phần phân trang

  // sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // end sort

  const product = await Product.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip); //limit là số lượng phần tử hiển thị

  for (const pro of product) {
    // lấy ra thông tin người tạo
    const user = await Account.findOne({
      _id: pro.createBy.accountID,
    });
    if (user) {
      pro.accfullName = user.fullName;
    }

    // lấy ra thông tin người cập nhật gần nhất
    const updateBy = pro.updateBy[pro.updateBy.length-1];
    if(updateBy){
      const userUpdate = await Account.findOne({
        _id: updateBy.accountID
      });

      updateBy.accfullName = userUpdate.fullName;
    }
    
  }

  res.render("admin/pages/product/index.pug", {
    pageTitle: "Trang danh sách sản phẩm",
    products: product,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination,
  });
};

// [PATCH] /admin/product/changeStatus/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  const updated = {
    accountID: res.locals.user.id,
    updateAt: new Date(),
  };
  await Product.updateOne({ _id: id },{ 
    status: status,
    $push: { updateBy: updated } 
  });

  req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");

  res.redirect("back"); // Express đọc tài liệu response
};

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  const updated = {
    accountID: res.locals.user.id,
    updateAt: new Date(),
  };
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { 
        status: "active", 
        $push: { updateBy: updated } 
      });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`
      );
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { 
        status: "inactive",
        $push: { updateBy: updated } 
      });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`
      );
      break;
    case "delete-all": // xóa nhiều
      await Product.updateMany(
        { _id: { $in: ids } },
        {
          deleted: true,
          deletedBy: {
            accountID: res.locals.user.id,
            deletedAt: new Date(),
          },
        }
      );
      req.flash("success", `Xóa thành công ${ids.length} sản phẩm!`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);

        await Product.updateOne({ _id: id }, { 
          position: position,
          $push: { updateBy: updated } 
        });
      }
      req.flash("success", `Đổi vị trí thành công ${ids.length} sản phẩm!`);
      break;
    default:
      break;
  }

  res.redirect("back");
};

// [DELETE] /admin/product/delete
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id });
  await Product.updateOne(
    { _id: id },
    {
      // xóa 1
      deleted: true,
      deletedBy: {
        accountID: res.locals.user.id,
        deletedAt: new Date(),
      },
    }
  );

  req.flash("success", `Xóa thành công  sản phẩm!`);

  res.redirect("back"); // Express đọc tài liệu response
};

// [GET] /admin/product/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const danhmuc = await Product_Category.find(find);

  const newDanhmuc = createTreeHelper.tree(danhmuc);

  res.render("admin/pages/product/create.pug", {
    pageTitle: "Thêm mới sản phẩm",
    danhmuc: newDanhmuc,
  });
};

// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  req.body.createBy = {
    // thêm 1 key createBy
    accountID: res.locals.user.id,
  };

  const product = new Product(req.body); // tạo mới 1 sản phẩm
  await product.save(); // lưu vào database

  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] /admin/product/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);

    const danhmuc = await Product_Category.find({
      deleted: false,
    });

    const newDanhmuc = createTreeHelper.tree(danhmuc);

    res.render("admin/pages/product/edit.pug", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      danhmuc: newDanhmuc,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  try {
    const updated = {
      accountID: res.locals.user.id,
      updateAt: new Date(),
    };
    await Product.updateOne(
      { _id: id },
      {
        ...req.body, // lấy ra những phần tử cũ
        $push: { updateBy: updated }, // push vào mảng updateBy
      }
    );
    req.flash("success", `Cập nhật thành công sản phẩm!`);
  } catch (error) {
    req.flash("error", `Cập nhật thất bại!`);
  }

  res.redirect(`back`);
};

// [GET] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const product = await Product.findOne(find);

    // console.log(product);

    res.render("admin/pages/product/detail.pug", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};
