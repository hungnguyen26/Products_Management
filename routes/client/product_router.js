const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.render("client/pages/product/index.pug")
})

module.exports = router;