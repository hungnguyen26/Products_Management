const express = require('express');
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");

router.get('/', controller.product);

module.exports = router;