import { z } from "zod";

const emptyObject = z.object({}).default({});
const email = z.email().toLowerCase().trim();

export const signupSchema = z.object({
  body: z.object({
    email,
    password: z.string().min(8).max(128),
    name: z.string().min(2).max(100)
  }),
  params: emptyObject,
  query: emptyObject
});

export const loginSchema = z.object({
  body: z.object({
    email,
    password: z.string().min(8).max(128)
  }),
  params: emptyObject,
  query: emptyObject
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email
  }),
  params: emptyObject,
  query: emptyObject
});

export const verifyOtpSchema = z.object({
  body: z.object({
    email,
    otp: z.string().regex(/^\d{6}$/)
  }),
  params: emptyObject,
  query: emptyObject
});

export const googleAuthSchema = z.object({
  body: z.object({
    idToken: z.string().min(1)
  }),
  params: emptyObject,
  query: emptyObject
});
