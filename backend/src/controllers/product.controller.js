import * as productService from "../services/product.service.js";
import { sendResponse } from "../utils/response.js";

export const listProducts = async (req, res) => {
  const result = await productService.listProducts(req.query);
  return sendResponse(res, 200, "Products fetched successfully", result);
};

export const getProductById = async (req, res) => {
  const result = await productService.getProductById(req.params.productId);
  return sendResponse(res, 200, "Product fetched successfully", result);
};
