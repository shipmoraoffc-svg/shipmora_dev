import crypto from "crypto";

export const attachRequestContext = (req, _res, next) => {
  req.context = {
    requestId: crypto.randomUUID()
  };
  next();
};
