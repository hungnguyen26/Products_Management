const product_router = require("./product_router");
const home_router = require("./home_router");

const categoryMidleware = require("../../middlewares/client/category.middleware");

module.exports = (app) => {
  app.use(categoryMidleware.category); // router nào cũng luôn luôn chạy qua midleware này

  app.use("/", home_router);

  app.use("/products", product_router);
};
