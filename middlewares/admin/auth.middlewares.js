const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Account.findOne({ token: req.cookies.token }).select("-password");
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      const role = await Role.findOne({
        _id: user.Role_id,
      }).select("title nhomQuyen")
      res.locals.user = user;  // tạo biến toàn cục tên user, tất cả file pug đều dùng được user
      res.locals.role = role;  
      next(); //next sang bước tiếp theo
    }
  }
};
