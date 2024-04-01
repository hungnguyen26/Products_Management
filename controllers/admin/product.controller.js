    const Product = require("../../models/products-model");
    const filterStatusHelper = require("../../helpers/filterStatus");
    const searchHelper = require("../../helpers/search");
    const paginationHelper = require("../../helpers/pagination");

    // [GET] admin/product
module.exports.product = async (req, res) => {
        
        //đoạn bộ lọc
    const filterStatus =  filterStatusHelper(req.query);
    //    console.log(filterStatus);
        
        let find = {
            deleted: false,
        }

        if(req.query.status){
            find.status = req.query.status;  // truyển thêm 1 key status vào obj find
        }
        //end đoạn bộ lọc


        // phần tìm kiếm
        const objectSearch = searchHelper(req.query);
        if(objectSearch.regex ){
            find.title = objectSearch.regex;
        }
        // end phần tìm kiếm



    // phần phân trang 
        const countProduct = await Product.countDocuments(find);  // đếm tổng số sản phẩm

        let objectPagination = paginationHelper({
            limitItem: 4,   // sl phần tử mỗi trang
            currentPage:1
        }, req.query , countProduct);
    
    // end phần phân trang 


        const product = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);   //limit là số lượng phần tử hiển thị

        res.render("admin/pages/product/index.pug",{
            pageTitle: "Trang danh sách sản phẩm",
            products:product,
            filterStatus:filterStatus,
            keyword:objectSearch.keyword,
            pagination:objectPagination
        }); 
}

    // [GET] admin/product/changeStatus/:status/:id
module.exports.changeStatus = async (req, res) =>{
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id},{status: status});

   
    res.redirect("back");  // Express đọc tài liệu response
}