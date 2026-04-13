import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env.js";
import { supabase, supabaseAdmin } from "../config/supabase.js";
import { ApiError } from "../utils/apiError.js";
import { signAppToken } from "../utils/jwt.js";
import { createAuditLog } from "./audit.service.js";
import { issueOtp, verifyOtp as verifyOtpRecord } from "./otp.service.js";

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

const ensurePublicUser = async ({ id, email, name, provider, avatarUrl = null }) => {
  const { error } = await supabaseAdmin.from("users").upsert(
    {
      id,
      email,
      name,
      provider
    },
    { onConflict: "id" }
  );

  if (error) {
    throw new ApiError(500, "Unable to sync user record");
  }

  const { error: profileError } = await supabaseAdmin.from("profiles").upsert(
    {
      user_id: id,
      avatar_url: avatarUrl
    },
    { onConflict: "user_id" }
  );

  if (profileError) {
    throw new ApiError(500, "Unable to sync profile record");
  }
};

const buildAuthResponse = (user, session = null) => ({
  user,
  accessToken: signAppToken(user),
  supabaseSession: session
});

export const signup = async ({ email, password, name }) => {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
    user_metadata: {
      name,
      provider: "email"
    }
  });

  if (error) {
    throw new ApiError(400, error.message);
  }

  const user = {
    id: data.user.id,
    email,
    name,
    provider: "email",
    role: "customer"
  };

  try {
    await ensurePublicUser(user);
  } catch (syncError) {
    await supabaseAdmin.auth.admin.deleteUser(user.id);
    throw syncError;
  }

  let otpInfo;

  try {
    otpInfo = await issueOtp(email);
  } catch (otpError) {
    await supabaseAdmin.auth.admin.deleteUser(user.id);
    throw otpError;
  }
  await createAuditLog({ userId: user.id, action: "auth.signup", metadata: { email } });

  return {
    user,
    otp: otpInfo,
    message: "Account created. Verify the OTP sent to your email to complete activation."
  };
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { data: profile } = await supabaseAdmin
    .from("users")
    .select("id, email, name, provider, role")
    .eq("id", data.user.id)
    .single();

  const user = {
    id: data.user.id,
    email: data.user.email,
    name: profile?.name ?? data.user.user_metadata?.name ?? "",
    provider: profile?.provider ?? data.user.app_metadata?.provider ?? "email",
    role: profile?.role ?? "customer"
  };

  await ensurePublicUser(user);
  await createAuditLog({ userId: user.id, action: "auth.login", metadata: { provider: user.provider } });

  return buildAuthResponse(user, data.session);
};

export const forgotPassword = async ({ email }) => {
  const redirectTo = env.PASSWORD_RESET_REDIRECT_URL || `${env.FRONTEND_URL}/reset-password`;

  const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

  if (resetError) {
    throw new ApiError(400, resetError.message);
  }

  const otpInfo = await issueOtp(email);

  await createAuditLog({ action: "auth.forgot_password", metadata: { email } });

  return {
    otp: otpInfo,
    resetRedirect: redirectTo
  };
};

export const verifyOtp = async ({ email, otp }) => {
  const result = await verifyOtpRecord(email, otp);
  await createAuditLog({ action: "auth.verify_otp", metadata: { email } });
  return result;
};

export const googleAuth = async ({ idToken }) => {
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: env.GOOGLE_CLIENT_ID
  });

  const payload = ticket.getPayload();

  if (!payload?.email) {
    throw new ApiError(400, "Google token did not include an email address");
  }

  const email = payload.email;
  const name = payload.name ?? "Google User";

  const { data: existingUser, error: userLookupError } = await supabaseAdmin
    .from("users")
    .select("id, email, name, provider, role")
    .eq("email", email)
    .maybeSingle();

  if (userLookupError) {
    throw new ApiError(500, "Unable to lookup Google account");
  }

  let user = existingUser;

  if (!user) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        name,
        provider: "google",
        avatar_url: payload.picture ?? null
      }
    });

    if (error) {
      throw new ApiError(400, error.message);
    }

    user = {
      id: data.user.id,
      email,
      name,
      provider: "google",
      role: "customer"
    };
  } else {
    user = {
      ...user,
      name: user.name || name,
      provider: "google"
    };
  }

  await ensurePublicUser({
    ...user,
    avatarUrl: payload.picture ?? null
  });

  await createAuditLog({ userId: user.id, action: "auth.google", metadata: { email } });

  return buildAuthResponse(user);
};
