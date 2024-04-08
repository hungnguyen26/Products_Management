const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get('/', controller.product);

router.patch('/changeStatus/:status/:id', controller.changeStatus);    // : là router động

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.get('/create', controller.create);

router.post('/create', controller.createPost);


module.exports = router;