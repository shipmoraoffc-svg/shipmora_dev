import { ApiError } from "../utils/apiError.js";
import { sanitizePayload } from "../utils/sanitize.js";

export const validate = (schema) => (req, _res, next) => {
  req.body = sanitizePayload(req.body);
  req.params = sanitizePayload(req.params);
  req.query = sanitizePayload(req.query);

  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query
  });

  if (!result.success) {
    return next(new ApiError(400, "Validation failed", result.error.flatten()));
  }

  req.body = result.data.body;
  req.params = result.data.params;
  req.query = result.data.query;

  return next();
};
