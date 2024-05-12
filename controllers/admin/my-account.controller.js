var md5 = require("md5");
const Account = require("../../models/accounts.model");

// [GET] admin/my-account
module.exports.index = async (req, res) => {
  res.render("admin/pages/my-account/index.pug", {
    pageTitle: "Thông tin cá nhân",
  });
};

// [GET] admin/my-account/edit
module.exports.edit = async (req, res) => {
  res.render("admin/pages/my-account/edit.pug", {
    pageTitle: "Chỉnh sửa thông tin cá nhân",
  });
};

// [PATCH] admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  const emailTonTai = await Account.findOne({
    _id: { $ne: id }, // tìm những bản ghi có id không = id này
    email: req.body.email,
    deleted: false
  });

  if (emailTonTai) {
    req.flash("error", "Email đã tồn tại");
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Account.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật tài khoản thành công!");
  }

  res.redirect("back");
};
