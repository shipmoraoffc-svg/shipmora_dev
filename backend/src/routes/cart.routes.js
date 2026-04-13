import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { addToCartSchema, cartItemSchema } from "../schemas/cart.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authenticate);
router.post("/", validate(addToCartSchema), asyncHandler(cartController.addToCart));
router.get("/", asyncHandler(cartController.getCart));
router.delete("/:productId", validate(cartItemSchema), asyncHandler(cartController.removeFromCart));

export default router;
