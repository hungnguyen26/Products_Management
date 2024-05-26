const md5 = require("md5")
const User = require("../../models/users.model");

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register.pug", {
    pageTitle: "Đăng ký tài khoản",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  // console.log(req.body);
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if( existEmail) {
    req.flash("error", `Email đã tồn tại !`);
    res.redirect("back");
    return;
  }
  req.body.password = md5(req.body.password); // mã hóa pass trước khi lưu vào db
  const user= new User(req.body);
  await user.save();
  // res.cookie("tokenUser", user.tokenUser)
  res.redirect("/user/login");  // đk thành công sẽ chuyển về trag login
};

// [GET] /user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login.pug", {
    pageTitle: "Đăng nhập tài khoản",
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted:false
  })
  if( !user) {
    req.flash("error", `Email không tồn tại !`);
    res.redirect("back");
    return;
  }
  
  if( md5(password) != user.password) {
    req.flash("error", `Sai mật khẩu !`);
    res.redirect("back");
    return;
  }

  if( user.status == "inactive") {
    req.flash("error", `Tài khoản đang bị khóa !`);
    res.redirect("back");
    return;
  }
  res.cookie("tokenUser",user.tokenUser);

  res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");  // xóa cookie để đăng xuats

  res.redirect("/");
};