const express = require('express')

const router = require("./routes/client/index_router")

const app = express()
const port = 3000

app.set('views', './views');
app.set('view engine', 'pug');


// router
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})