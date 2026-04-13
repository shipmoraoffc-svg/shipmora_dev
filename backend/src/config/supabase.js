import { createClient } from "@supabase/supabase-js";
import { env } from "./env.js";

const sharedOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
};

export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
  sharedOptions
);

export const supabaseAdmin = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  sharedOptions
);
