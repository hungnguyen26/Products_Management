const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/rooms-chat.controller")

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.createPost);


module.exports = router;