import * as cartService from "../services/cart.service.js";
import { sendResponse } from "../utils/response.js";

export const addToCart = async (req, res) => {
  const result = await cartService.addToCart(req.auth.sub, req.body);
  return sendResponse(res, 200, "Cart updated successfully", result);
};

export const getCart = async (req, res) => {
  const result = await cartService.getCart(req.auth.sub);
  return sendResponse(res, 200, "Cart fetched successfully", result);
};

export const removeFromCart = async (req, res) => {
  const result = await cartService.removeFromCart(req.auth.sub, req.params.productId);
  return sendResponse(res, 200, "Cart item removed successfully", result);
};
