const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer();

const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../Validates/admin/products-category.validate");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middlewares");

router.get("/", controller.product);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);

router.get("/detail/:id", controller.detail);

router.delete("/delete/:id", controller.delete);


module.exports = router;
