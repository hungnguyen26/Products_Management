const Role = require("../../models/roles.model");

const systemConfig = require("../../config/system");

// [GET] admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const danhmuc = await Role.find(find);

  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Nhóm quyền",
    danhmuc: danhmuc,
  });
};

// [GET] admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Tạo nhóm quyền",
  });
};

// [POST] admin/roles/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);

  const banghi = new Role(req.body);
  await banghi.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};

// [GET] admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    const data = await Role.findOne(find);
    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Sửa nhóm quyền",
      data: data,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

// [PATCH] admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    await Role.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhật nhóm quyền thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật nhóm quyền thất bại!");
  }
  res.redirect("back");
};

// [GET] admin/detail/:id
module.exports.detail = async (req, res) => {
  try {
    let find ={
      deleted: false,
    }
    
    const role = await Role.findOne(find);

    res.render("admin/pages/roles/detail.pug",{
      pageTitle: role.title,
      role: role
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
  }
};