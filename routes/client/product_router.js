const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/product_controller")

router.get('/', controller.product);

router.get('/:slugCategory', controller.Category);

router.get('/detail/:slugProduct', controller.detail);

module.exports = router;