const product_router = require("./product_router")
const home_router = require("./home_router")

module.exports = (app)=>{
    app.use('/',home_router);
    app.use('/products', product_router);
}