module.exports.registerPost = (req, res, next) => {
    if (!req.body.fullName) {
      req.flash("error", `Vui lòng nhập họ tên!`);
      res.redirect("back");
      return;
    }
    if (!req.body.email) {
      req.flash("error", `Vui lòng nhập email!`);
      res.redirect("back");
      return;
    }
    if (!req.body.password) {
      req.flash("error", `Vui lòng nhập mật khẩu!`);
      res.redirect("back"); 
      return;
    }
    next();
  };


  module.exports.loginPost = (req, res, next) => {
    if (!req.body.email) {
      req.flash("error", `Vui lòng nhập email!`);
      res.redirect("back");
      return;
    }
    if (!req.body.password) {
      req.flash("error", `Vui lòng nhập mật khẩu!`);
      res.redirect("back"); 
      return;
    }
    next();
  };

module.exports.forgotPasswordPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập email!`);
    res.redirect("back");
    return;
  }
  next();
};

module.exports.resetPasswordPost = (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", `Mật khẩu không được để trống!`);
    res.redirect("back");
    return;
  }
  if (!req.body.confirmPassword) {
    req.flash("error", `Xác nhận lại mật khẩu!`);
    res.redirect("back");
    return;
  }
  if(req.body.password != req.body.confirmPassword){
    req.flash("error", `Xác nhận mật khẩu không trùng khớp!`);
    res.redirect("back");
    return;
  }
  next();
};