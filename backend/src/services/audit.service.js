import { supabaseAdmin } from "../config/supabase.js";

export const createAuditLog = async ({ userId = null, action, metadata = {} }) => {
  const { error } = await supabaseAdmin.from("audit_logs").insert({
    user_id: userId,
    action,
    metadata
  });

  if (error) {
    console.error("Failed to write audit log", error);
  }
};
