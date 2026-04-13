import * as wishlistService from "../services/wishlist.service.js";
import { sendResponse } from "../utils/response.js";

export const addToWishlist = async (req, res) => {
  const result = await wishlistService.addToWishlist(req.auth.sub, req.body.product_id);
  return sendResponse(res, 200, "Wishlist updated successfully", result);
};

export const getWishlist = async (req, res) => {
  const result = await wishlistService.getWishlist(req.auth.sub);
  return sendResponse(res, 200, "Wishlist fetched successfully", result);
};

export const removeFromWishlist = async (req, res) => {
  const result = await wishlistService.removeFromWishlist(req.auth.sub, req.params.productId);
  return sendResponse(res, 200, "Wishlist item removed successfully", result);
};
