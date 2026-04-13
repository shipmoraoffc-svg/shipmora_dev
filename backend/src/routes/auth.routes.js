import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middleware/validate.middleware.js";
import { authRateLimiter, otpRateLimiter } from "../middleware/rateLimit.middleware.js";
import {
  forgotPasswordSchema,
  googleAuthSchema,
  loginSchema,
  signupSchema,
  verifyOtpSchema
} from "../schemas/auth.schema.js";

const router = Router();

router.post("/signup", authRateLimiter, validate(signupSchema), asyncHandler(authController.signup));
router.post("/login", authRateLimiter, validate(loginSchema), asyncHandler(authController.login));
router.post(
  "/forgot-password",
  otpRateLimiter,
  validate(forgotPasswordSchema),
  asyncHandler(authController.forgotPassword)
);
router.post("/verify-otp", otpRateLimiter, validate(verifyOtpSchema), asyncHandler(authController.verifyOtp));
router.post("/google", authRateLimiter, validate(googleAuthSchema), asyncHandler(authController.googleAuth));

export default router;
