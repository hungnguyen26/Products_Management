// [GET] /
module.exports.home = async (req, res) => {
  res.render("client/pages/home/index.pug", {
    pageTitle: "Trang chủ"
  });
};
