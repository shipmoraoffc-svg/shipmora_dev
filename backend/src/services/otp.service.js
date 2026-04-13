import { SendEmailCommand } from "@aws-sdk/client-sesv2";
import { env } from "../config/env.js";
import { sesClient } from "../config/aws.js";
import { supabaseAdmin } from "../config/supabase.js";
import { ApiError } from "../utils/apiError.js";
import { generateOtp, hashOtp } from "../utils/otp.js";

const buildOtpEmail = (otp) => ({
  Subject: {
    Data: "Your Shipmora verification code"
  },
  Body: {
    Html: {
      Data: `<p>Your Shipmora OTP is <strong>${otp}</strong>.</p><p>It expires in ${env.OTP_EXPIRY_MINUTES} minutes.</p>`
    },
    Text: {
      Data: `Your Shipmora OTP is ${otp}. It expires in ${env.OTP_EXPIRY_MINUTES} minutes.`
    }
  }
});

export const issueOtp = async (email) => {
  const cooldownBoundary = new Date(Date.now() - env.OTP_RESEND_COOLDOWN_SECONDS * 1000).toISOString();

  const { data: recentOtp, error: recentOtpError } = await supabaseAdmin
    .from("otp_verifications")
    .select("id, created_at")
    .eq("email", email)
    .gte("created_at", cooldownBoundary)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (recentOtpError) {
    throw new ApiError(500, "Unable to evaluate OTP rate limit");
  }

  if (recentOtp) {
    throw new ApiError(429, "Please wait before requesting another OTP");
  }

  const otp = generateOtp();
  const expiresAt = new Date(Date.now() + env.OTP_EXPIRY_MINUTES * 60 * 1000).toISOString();

  const { error } = await supabaseAdmin.from("otp_verifications").insert({
    email,
    otp: hashOtp(otp),
    expires_at: expiresAt,
    verified: false
  });

  if (error) {
    throw new ApiError(500, "Unable to store OTP");
  }

  await sesClient.send(
    new SendEmailCommand({
      FromEmailAddress: env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [email]
      },
      Content: {
        Simple: buildOtpEmail(otp)
      }
    })
  );

  return { expiresAt };
};

export const verifyOtp = async (email, otp) => {
  const { data, error } = await supabaseAdmin
    .from("otp_verifications")
    .select("id, email, otp, expires_at, verified")
    .eq("email", email)
    .eq("verified", false)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new ApiError(500, "Unable to verify OTP");
  }

  if (!data) {
    throw new ApiError(400, "No active OTP found for this email");
  }

  if (data.expires_at < new Date().toISOString()) {
    throw new ApiError(400, "OTP has expired");
  }

  if (data.otp !== hashOtp(otp)) {
    throw new ApiError(400, "Invalid OTP");
  }

  const { error: updateError } = await supabaseAdmin
    .from("otp_verifications")
    .update({ verified: true })
    .eq("id", data.id);

  if (updateError) {
    throw new ApiError(500, "Unable to update OTP status");
  }

  const { data: userData } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (userData?.id) {
    const { error: confirmError } = await supabaseAdmin.auth.admin.updateUserById(userData.id, {
      email_confirm: true
    });

    if (confirmError) {
      throw new ApiError(500, "OTP verified but email confirmation sync failed");
    }
  }

  return { verified: true };
};
