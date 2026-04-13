import * as profileService from "../services/profile.service.js";
import { sendResponse } from "../utils/response.js";

export const getProfile = async (req, res) => {
  const profile = await profileService.getProfile(req.auth.sub);
  return sendResponse(res, 200, "Profile fetched successfully", profile);
};

export const updateProfile = async (req, res) => {
  const profile = await profileService.updateProfile(req.auth.sub, req.body);
  return sendResponse(res, 200, "Profile updated successfully", profile);
};
