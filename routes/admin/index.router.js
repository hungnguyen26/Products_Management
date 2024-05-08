const systemConfig = require("../../config/system")
const dashboard_router = require("./dashboard_router")
const product_router = require("./product.router")
const products_category_router = require("./products-catergory.router")
const roles_router = require("./roles.router")
const account_router = require("./account.router")
const auth_router = require("./auth.router")

module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;

    app.use(PATH_ADMIN + '/dashboard',dashboard_router);
    
    app.use(PATH_ADMIN + '/products',product_router);

    app.use(PATH_ADMIN + '/products-category', products_category_router);

    app.use(PATH_ADMIN + '/roles', roles_router);

    app.use(PATH_ADMIN + '/accounts', account_router);

    app.use(PATH_ADMIN + '/auth', auth_router);


}