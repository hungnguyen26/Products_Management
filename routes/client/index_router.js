const product_router = require("./product_router");
const home_router = require("./home_router");
const search_router = require("./search.router");
const cart_router = require("./cart.router");
const checkout_router = require("./checkout.router");
const user_router = require("./user.router");
const chat_router = require("./chat.router");
const users_router = require("./users.router");

const categoryMidleware = require("../../middlewares/client/category.middleware");
const cartMidleware = require("../../middlewares/client/cart.middleware");
const userMidleware = require("../../middlewares/client/user.middleware");
const SettingMidleware = require("../../middlewares/client/setting.middlewares");
const authMiddleware = require("../../middlewares/client/auth.middlewares");

module.exports = (app) => {
  app.use(categoryMidleware.category); // router nào cũng luôn luôn chạy qua midleware này
  app.use(cartMidleware.cartID); // router nào cũng luôn luôn chạy qua midleware này
  app.use(userMidleware.infoUser);
  app.use(SettingMidleware.settingGeneral);

  app.use("/", home_router);

  app.use("/products", product_router);

  app.use("/search", search_router);

  app.use("/cart", cart_router);

  app.use("/checkout", checkout_router);

  app.use("/user", user_router);

  app.use("/chat", authMiddleware.requireAuth, chat_router);

  app.use("/users", authMiddleware.requireAuth, users_router);
};
