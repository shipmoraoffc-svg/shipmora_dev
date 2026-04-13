import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signAppToken = (user) =>
  jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role ?? "customer",
      provider: user.provider ?? "email"
    },
    env.APP_JWT_SECRET,
    {
      expiresIn: env.APP_JWT_EXPIRES_IN
    }
  );

export const verifyAppToken = (token) =>
  jwt.verify(token, env.APP_JWT_SECRET);
