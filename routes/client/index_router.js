const product_router = require("./product_router");
const home_router = require("./home_router");
const search_router = require("./search.router");
const cart_router = require("./cart.router");

const categoryMidleware = require("../../middlewares/client/category.middleware");
const cartMidleware = require("../../middlewares/client/cart.middleware");

module.exports = (app) => {
  app.use(categoryMidleware.category); // router nào cũng luôn luôn chạy qua midleware này
  app.use(cartMidleware.cartID); // router nào cũng luôn luôn chạy qua midleware này

  app.use("/", home_router);

  app.use("/products", product_router);

  app.use("/search", search_router);

  app.use("/cart", cart_router);
};
