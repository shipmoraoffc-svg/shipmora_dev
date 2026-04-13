import { sendResponse } from "../utils/response.js";
import * as authService from "../services/auth.service.js";

export const signup = async (req, res) => {
  const result = await authService.signup(req.body);
  return sendResponse(res, 201, result.message, result);
};

export const login = async (req, res) => {
  const result = await authService.login(req.body);
  return sendResponse(res, 200, "Login successful", result);
};

export const forgotPassword = async (req, res) => {
  const result = await authService.forgotPassword(req.body);
  return sendResponse(res, 200, "Password reset flow initiated", result);
};

export const verifyOtp = async (req, res) => {
  const result = await authService.verifyOtp(req.body);
  return sendResponse(res, 200, "OTP verified successfully", result);
};

export const googleAuth = async (req, res) => {
  const result = await authService.googleAuth(req.body);
  return sendResponse(res, 200, "Google authentication successful", result);
};
