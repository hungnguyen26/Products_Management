const systemConfig = require("../../config/system");
const dashboard_router = require("./dashboard_router");
const product_router = require("./product.router");
const products_category_router = require("./products-catergory.router");
const roles_router = require("./roles.router");
const account_router = require("./account.router");
const auth_router = require("./auth.router");
const my_account = require("./my-account.router");
const setting = require("./setting.router");

const authMiddlewares = require("../../middlewares/admin/auth.middlewares");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddlewares.requireAuth,
    dashboard_router
  );

  app.use(
    PATH_ADMIN + "/products",
    authMiddlewares.requireAuth,
    product_router
  );

  app.use(
    PATH_ADMIN + "/products-category",
    authMiddlewares.requireAuth,
    products_category_router
  );

  app.use(PATH_ADMIN + "/roles", authMiddlewares.requireAuth, roles_router);

  app.use(
    PATH_ADMIN + "/accounts",
    authMiddlewares.requireAuth,
    account_router
  );

  app.use(PATH_ADMIN + "/auth", auth_router);

  app.use(PATH_ADMIN + "/my-account", authMiddlewares.requireAuth, my_account);

  app.use(PATH_ADMIN + "/settings",  authMiddlewares.requireAuth, setting);
};
