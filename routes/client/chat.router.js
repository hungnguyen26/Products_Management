const express = require('express');
const router = express.Router();

const controller = require("../../controllers/client/chat.controller");
const chatMiddleware = require("../../middlewares/client/chat.middlewares");

router.get('/:idRoomChat',chatMiddleware.isAccess, controller.index);

module.exports = router;