// [GET] admin/product
const Product = require("../../models/products-model");
const filterStatusHelper = require("../../helpers/filterStatus");


module.exports.product = async (req, res) => {
    
    //đoạn bộ lọc
   const filterStatus =  filterStatusHelper(req.query);
   console.log(filterStatus);
    
    let find = {
         deleted: false,
    }

    if(req.query.status){
        find.status = req.query.status;  // truyển thêm 1 key status vào obj find
    }

    let keyword = "";
    if(req.query.keyword){
        keyword = req.query.keyword;

        const regex = new RegExp(keyword,"i");   // i không phân biệt chữ hoa thường

        find.title = regex; 
    }

    const product = await Product.find(find);

    // console.log(product);
    res.render("admin/pages/product/index.pug",{
        pageTitle: "Trang danh sách sản phẩm",
        products:product,
        filterStatus:filterStatus,
        keyword:keyword
    }); 
}