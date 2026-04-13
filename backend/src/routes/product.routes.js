import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { productIdSchema, productListSchema } from "../schemas/product.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", validate(productListSchema), asyncHandler(productController.listProducts));
router.get("/:productId", validate(productIdSchema), asyncHandler(productController.getProductById));

export default router;
