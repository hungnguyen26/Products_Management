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
  res.cookie("tokenUser", user.tokenUser)
  res.redirect("/");
};
