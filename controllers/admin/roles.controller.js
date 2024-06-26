const Role = require("../../models/roles.model");

const systemConfig = require("../../config/system");
const Account = require("../../models/accounts.model");

// [GET] admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const danhmuc = await Role.find(find);
  for (const dm of danhmuc) {
    // lấy ra thông tin người cập nhật gần nhất
    const updateBy = dm.updateBy[dm.updateBy.length - 1];
    if (updateBy) {
      const userUpdate = await Account.findOne({
        _id: updateBy.accountID,
      });

      updateBy.accfullName = userUpdate.fullName;
    }
  }

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
    const updated = {
      accountID: res.locals.user.id,
      updateAt: new Date(),
    };
    await Role.updateOne(
      { _id: id },
      { ...req.body, $push: { updateBy: updated } }
    );
    req.flash("success", "Cập nhật nhóm quyền thành công!");
  } catch (error) {
    req.flash("error", "Cập nhật nhóm quyền thất bại!");
  }
  res.redirect("back");
};

// [GET] admin/roles/detail/:id
module.exports.detail = async (req, res) => {
  try {
    let find = {
      deleted: false,
      _id: req.params.id,
    };

    const role = await Role.findOne(find);

    res.render("admin/pages/roles/detail.pug", {
      pageTitle: role.title,
      role: role,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

// [DELETE] admin/roles/delete/:id
module.exports.delete = async (req, res) => {
  try {
    let find = {
      _id: req.params.id,
    };
    await Role.updateOne(find, {
      deleted: true,
      deletedAt: new Date(),
    });
    req.flash("success", "Xóa nhóm quyền thành công!!");
  } catch (error) {
    req.flash("errorr", "Xóa nhóm quyền thất bại!!");
  }
  res.redirect(`back`);
};

// [GET] admin/roles/permissions
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/permissions.pug", {
    pageTitle: "Phân quyền",
    records: records,
  });
};

// [PATCH] admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  try {
    const phanquyen = JSON.parse(req.body.phanquyen);
    for (const item of phanquyen) {
      await Role.updateOne({ _id: item.id }, { nhomQuyen: item.phanquyen });
    }
    req.flash("success", "Cập nhật phân quyền thành công! ");
  } catch (error) {
    req.flash("error", "Cập nhật phân quyền thất bại! ");
  }
  res.redirect("back");
};
