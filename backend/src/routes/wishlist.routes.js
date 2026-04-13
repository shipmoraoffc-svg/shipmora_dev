import { Router } from "express";
import * as wishlistController from "../controllers/wishlist.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { wishlistCreateSchema, wishlistItemSchema } from "../schemas/wishlist.schema.js";

const router = Router();

router.use(authenticate);
router.post("/", validate(wishlistCreateSchema), asyncHandler(wishlistController.addToWishlist));
router.get("/", asyncHandler(wishlistController.getWishlist));
router.delete("/:productId", validate(wishlistItemSchema), asyncHandler(wishlistController.removeFromWishlist));

export default router;
