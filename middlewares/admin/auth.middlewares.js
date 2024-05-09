const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Account.findOne({ token: req.cookies.token });
    if (!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
    //   console.log(user);
      next(); //next sang bước tiếp theo
    }
  }
};
