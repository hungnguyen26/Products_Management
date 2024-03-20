module.exports.product = async (req, res) => {
    res.render("client/pages/product/index.pug",{
        pageTitle:"Trang danh sách sản phẩm"
    })
}