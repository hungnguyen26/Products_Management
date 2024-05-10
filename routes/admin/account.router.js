const express = require("express");
const multer = require("multer");

const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares");
const validate = require("../../Validates/admin/accounts.validate");
const upload = multer();

const controller = require("../../controllers/admin/account.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.editPatch  ,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

module.exports = router;
