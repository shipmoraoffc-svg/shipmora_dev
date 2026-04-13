import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  APP_NAME: z.string().default("Shipmora API"),
  APP_BASE_URL: z.string().url().optional(),
  FRONTEND_URL: z.string().url(),
  ALLOWED_ORIGINS: z.string().default("http://localhost:5173"),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SUPABASE_JWT_SECRET: z.string().min(1),
  APP_JWT_SECRET: z.string().min(32),
  APP_JWT_EXPIRES_IN: z.string().default("1h"),
  GOOGLE_CLIENT_ID: z.string().min(1),
  AWS_REGION: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  SES_FROM_EMAIL: z.string().email(),
  OTP_EXPIRY_MINUTES: z.coerce.number().int().positive().default(10),
  OTP_RESEND_COOLDOWN_SECONDS: z.coerce.number().int().positive().default(60),
  PASSWORD_RESET_REDIRECT_URL: z.string().url().optional()
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment variables: ${parsed.error.message}`);
}

export const env = {
  ...parsed.data,
  allowedOrigins: parsed.data.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
};
