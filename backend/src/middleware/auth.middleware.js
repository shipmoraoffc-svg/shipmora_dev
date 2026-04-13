import { ApiError } from "../utils/apiError.js";
import { verifyAppToken } from "../utils/jwt.js";

export const authenticate = (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authorization token is required"));
  }

  try {
    const token = header.replace("Bearer ", "");
    req.auth = verifyAppToken(token);
    return next();
  } catch {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};

export const authorize =
  (...roles) =>
  (req, _res, next) => {
    if (!roles.includes(req.auth?.role)) {
      return next(new ApiError(403, "You are not allowed to access this resource"));
    }

    return next();
  };
