// [GET] admin/product
const Product = require("../../models/products-model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");


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

    // phần tìm kiếm
    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex ){
        find.title = objectSearch.regex;
    }


    const product = await Product.find(find);

    // console.log(product);
    res.render("admin/pages/product/index.pug",{
        pageTitle: "Trang danh sách sản phẩm",
        products:product,
        filterStatus:filterStatus,
        keyword:objectSearch.keyword
    }); 
}