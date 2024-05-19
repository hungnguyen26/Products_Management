const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/cart.controller");

router.get('/', controller.index);

router.post('/add/:productID', controller.addPost);

module.exports = router;