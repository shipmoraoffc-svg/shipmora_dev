import { ApiError } from "../utils/apiError.js";

export const notFoundHandler = (_req, _res, next) => {
  next(new ApiError(404, "Route not found"));
};

export const errorHandler = (error, req, res, _next) => {
  const statusCode = error.statusCode ?? 500;

  if (statusCode >= 500) {
    console.error(`[${req.context?.requestId ?? "n/a"}]`, error);
  }

  res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
    details: error.details ?? null,
    requestId: req.context?.requestId ?? null
  });
};
