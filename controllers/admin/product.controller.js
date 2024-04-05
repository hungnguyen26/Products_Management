    const Product = require("../../models/products-model");
    const filterStatusHelper = require("../../helpers/filterStatus");
    const searchHelper = require("../../helpers/search");
    const paginationHelper = require("../../helpers/pagination");

    // [GET] /admin/product
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


        const product = await Product.find(find)
            .sort({position: "desc"})
            .limit(objectPagination.limitItem)
            .skip(objectPagination.skip);   //limit là số lượng phần tử hiển thị

        res.render("admin/pages/product/index.pug",{
            pageTitle: "Trang danh sách sản phẩm",
            products:product,
            filterStatus:filterStatus,
            keyword:objectSearch.keyword,
            pagination:objectPagination
        }); 
}

    // [PATCH] /admin/product/changeStatus/:status/:id
module.exports.changeStatus = async (req, res) =>{
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id},{status: status});

    req.flash('success', 'Cập nhật trạng thái sản phẩm thành công!');
    
    res.redirect("back");  // Express đọc tài liệu response
}


    // [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) =>{

    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, {status:'active'});
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, {status:'inactive'});
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "delete-all":     // xóa nhiều
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deletedAt: new Date()
            });
            req.flash('success', `Xóa thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position":    
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);

                await Product.updateOne({ _id: id }, {position:position});
            }
            break;
        default:
            break;
    }

    res.redirect("back"); 
};



    // [DELETE] /admin/product/delete
module.exports.deleteItem = async (req, res) =>{
    const id = req.params.id;

    // await Product.deleteOne({ _id: id }); 
    await Product.updateOne({_id: id},{      // xóa 1
        deleted: true,
        deletedAt: new Date()
    });

    req.flash('success', `Xóa thành công  sản phẩm!`);

    res.redirect("back");  // Express đọc tài liệu response
}