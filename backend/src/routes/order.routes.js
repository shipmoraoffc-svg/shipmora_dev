import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.use(authenticate);
router.post("/", asyncHandler(orderController.createOrder));
router.get("/", asyncHandler(orderController.listOrders));

export default router;
