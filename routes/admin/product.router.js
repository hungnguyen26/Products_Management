const express = require("express");
const multer = require("multer");
const router = express.Router();

const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../Validates/admin/products.validate");

router.get("/", controller.product);

router.patch("/changeStatus/:status/:id", controller.changeStatus); // : là router động

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);

router.post("/create", 
    upload.single("thumbnail"),
    validate.createPost,
    controller.createPost)

module.exports = router;
