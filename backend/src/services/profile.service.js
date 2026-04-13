import { supabaseAdmin } from "../config/supabase.js";
import { ApiError } from "../utils/apiError.js";
import { createAuditLog } from "./audit.service.js";

export const getProfile = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("avatar_url, address, phone, users!inner(id, email, name, provider, role)")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new ApiError(404, "Profile not found");
  }

  return {
    id: data.users.id,
    email: data.users.email,
    name: data.users.name,
    provider: data.users.provider,
    role: data.users.role,
    avatar_url: data.avatar_url,
    address: data.address,
    phone: data.phone
  };
};

export const updateProfile = async (userId, payload) => {
  const profilePayload = {};
  const userPayload = {};

  if (payload.avatar_url !== undefined) profilePayload.avatar_url = payload.avatar_url || null;
  if (payload.address !== undefined) profilePayload.address = payload.address || null;
  if (payload.phone !== undefined) profilePayload.phone = payload.phone || null;
  if (payload.name !== undefined) userPayload.name = payload.name;

  if (Object.keys(profilePayload).length > 0) {
    const { error } = await supabaseAdmin
      .from("profiles")
      .update(profilePayload)
      .eq("user_id", userId);

    if (error) {
      throw new ApiError(500, "Unable to update profile");
    }
  }

  if (Object.keys(userPayload).length > 0) {
    const { error } = await supabaseAdmin.from("users").update(userPayload).eq("id", userId);

    if (error) {
      throw new ApiError(500, "Unable to update user");
    }
  }

  await createAuditLog({ userId, action: "profile.update", metadata: payload });

  return getProfile(userId);
};
