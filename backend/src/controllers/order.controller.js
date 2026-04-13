import * as orderService from "../services/order.service.js";
import { sendResponse } from "../utils/response.js";

export const createOrder = async (req, res) => {
  const result = await orderService.createOrder(req.auth.sub);
  return sendResponse(res, 201, "Order created successfully", result);
};

export const listOrders = async (req, res) => {
  const result = await orderService.listOrders(req.auth.sub);
  return sendResponse(res, 200, "Orders fetched successfully", result);
};
