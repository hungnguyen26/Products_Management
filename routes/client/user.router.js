const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/user.controller");
const validate = require("../../Validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middlewares");

router.get("/register", controller.register);

router.post("/register", validate.registerPost, controller.registerPost);

router.get("/login", controller.login);

router.post("/login", validate.loginPost, controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post(
  "/password/forgot",
  validate.forgotPasswordPost,
  controller.forgotPasswordPost
);

router.get("/password/otp", controller.otptPassword);

router.post("/password/otp", controller.otptPasswordPost);

router.get("/password/reset", controller.resetPassword);

router.post(
  "/password/reset",
  validate.resetPasswordPost,
  controller.resetPasswordPost
);


router.get("/info",authMiddleware.requireAuth, controller.info);

module.exports = router;
