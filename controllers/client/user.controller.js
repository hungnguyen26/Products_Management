const md5 = require("md5");
const User = require("../../models/users.model");
const ForgotPassword = require("../../models/forgotPassword.model");

const generateHelper = require("../../helpers/generate");

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
  if (existEmail) {
    req.flash("error", `Email đã tồn tại !`);
    res.redirect("back");
    return;
  }
  req.body.password = md5(req.body.password); // mã hóa pass trước khi lưu vào db
  const user = new User(req.body);
  await user.save();
  // res.cookie("tokenUser", user.tokenUser)
  res.redirect("/user/login"); // đk thành công sẽ chuyển về trag login
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
    deleted: false,
  });
  if (!user) {
    req.flash("error", `Email không tồn tại !`);
    res.redirect("back");
    return;
  }

  if (md5(password) != user.password) {
    req.flash("error", `Sai mật khẩu !`);
    res.redirect("back");
    return;
  }

  if (user.status == "inactive") {
    req.flash("error", `Tài khoản đang bị khóa !`);
    res.redirect("back");
    return;
  }
  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser"); // xóa cookie để đăng xuats

  res.redirect("/");
};

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password.pug", {
    pageTitle: "Lấy lại mật khẩu",
  });
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  const userExist = await User.findOne({
    email:email ,
    deleted: false,
  });
  if(!userExist) {
    req.flash("error", `Email không tồn tại !`);
    res.redirect("back");
    return;
  }

  // việc 1:  tạo mã OTP và lưu thông tin yêu cầu vào collection (forgotPassword)
  const otp = generateHelper.generateRandomNumberOTP(6);
  const objectForgotPass = {
    email: email,
    otp: otp ,
    expireAt: Date.now()
  }

  const forgotPassword = new ForgotPassword(objectForgotPass);
  await forgotPassword.save();
  
  // việc 2: gửi mã OTP qua mail của user


  res.redirect(`/user/password/otp?email=${email}`);
};

// [GET] /user/password/otp
module.exports.otptPassword = async (req, res) => {
  const email = req.query.email;

  res.render("client/pages/user/otp-password.pug", {
    pageTitle: "Nhập mã OTP",
    email:email
  });
};

// [POST] /user/password/otp
module.exports.otptPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp:otp
  });

  if(!result){
    req.flash("error", `OTP không hợp lệ !`);
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email:email
  })
  res.cookie("tokenUser",user.tokenUser);
  res.redirect("/user/password/reset");
};