const systemConfig = require("../../config/system")
const dashboard_router = require("./dashboard_router")
const product_router = require("./product.router")

module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + '/dashboard',dashboard_router);
    
    app.use(PATH_ADMIN + '/products',product_router);

}