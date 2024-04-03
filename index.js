const express = require('express');
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
require("dotenv").config();
const database = require('./config/database')

const systemConfix = require("./config/system")

const router = require("./routes/client/index_router");
const routerAdmin = require("./routes/admin/index.router");

database.connect();


const app = express();
const port = process.env.PORT;

app.set('views', './views');
app.set('view engine', 'pug');

//app local variable
app.locals.prefixadmin = systemConfix.prefixAdmin;
app.use(express.static('public')) 


app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// router
routerAdmin(app);
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})