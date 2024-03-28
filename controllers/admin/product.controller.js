// [GET] admin/product
const Product = require("../../models/products-model")


module.exports.product = async (req, res) => {
    console.log(req.query.status);
    let filterStatus = [
        {
            name: "Tất cả",
            status:"",
            class:""
        },
        {
            name: "Hoạt động",
            status:"active",
            class:""
        },
        {
            name: "Dừng hoạt động",
            status:"inactive",
            class:""
        }
    ]

    if(req.query.status){
        const index = filterStatus.findIndex((item)=>
            item.status == req.query.status
        );
        filterStatus[index].class = "active";
    }else{
        const index = filterStatus.findIndex((item)=>
            item.status == ""
        );
        filterStatus[index].class = "active";
    }
    
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