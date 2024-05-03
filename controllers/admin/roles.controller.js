const Role = require("../../models/roles.model");

const systemConfig = require("../../config/system");

// [GET] admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    };

    const danhmuc = await Role.find(find);

    res.render("admin/pages/roles/index.pug",{
        pageTitle: "Nhóm quyền",
        danhmuc: danhmuc
    });
}

// [GET] admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create.pug",{
        pageTitle: "Tạo nhóm quyền",
    });
}

// [POST] admin/roles/create
module.exports.createPost = async (req, res) => {
    console.log(req.body);

    const banghi = new Role(req.body);
    await banghi.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}