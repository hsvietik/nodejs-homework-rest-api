const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");
const {
  registerSchema,
  loginSchema,
  emailSchema,
} = require("../../models/user");
const controllers = require("../../controllers/auth");

const router = express.Router();
router.post("/register", validateBody(registerSchema), controllers.register);
router.get("/verify/:verificationToken", controllers.verifyEmail);
router.post(
  "/verify",
  validateBody(emailSchema),
  controllers.resendVerifyEmail
);

router.post("/login", validateBody(loginSchema), controllers.login);

router.get("/current", authenticate, controllers.getCurrent);

router.post("/logout", authenticate, controllers.logout);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
