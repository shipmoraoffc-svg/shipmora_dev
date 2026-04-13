import { Router } from "express";
import * as profileController from "../controllers/profile.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { updateProfileSchema } from "../schemas/profile.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authenticate);
router.get("/", asyncHandler(profileController.getProfile));
router.put("/", validate(updateProfileSchema), asyncHandler(profileController.updateProfile));

export default router;
