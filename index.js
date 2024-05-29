const express = require("express");

var methodOverride = require("method-override");
var bodyParser = require("body-parser");
require("dotenv").config();
var flash = require("express-flash");

const database = require("./config/database");
const systemConfix = require("./config/system");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const router = require("./routes/client/index_router");
const routerAdmin = require("./routes/admin/index.router");

database.connect();

var moment = require("moment");   //convert ngày 

const app = express();
const port = process.env.PORT;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// khởi tạo thư viện flash: (hiển thị ra thông báo bên fe)
app.use(cookieParser("dhdasjdhas"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash

//app local variable
app.locals.prefixadmin = systemConfix.prefixAdmin;
app.locals.moment = moment;
app.use(express.static(`${__dirname}/public`));

app.use(methodOverride("_method"));

// router
routerAdmin(app);
router(app);

app.get("*",(req,res)=>{                      // * là cho tất cả TH còn lại
  res.render("client/pages/errors/404.pug"),{
    pageTitle:"404 Not Found"
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
