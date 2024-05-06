var md5 = require("md5");
const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");

const systemConfig = require("../../config/system");

// [GET] admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Account.find(find).select("-password -token");   // hiển thị ra tất cả loại trừ password và token

  for (const record of records) {
    const role = await Role.findOne({
      _id: record.Role_id,
      deleted:false
    })
    record.role = role;
  }
  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

// [GET] admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles,
  });
};

// [POST] admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailTonTai = await Account.findOne({
    email: req.body.email,
    deleted: false
  })
  if(emailTonTai){
    req.flash("error","Email đã tồn tại");
    res.redirect("back");
  }else{
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
  
};
