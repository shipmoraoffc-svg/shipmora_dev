import { z } from "zod";

const emptyObject = z.object({}).default({});

export const updateProfileSchema = z.object({
  body: z.object({
    avatar_url: z.url().optional().or(z.literal("")),
    address: z.string().max(255).optional().or(z.literal("")),
    phone: z.string().max(20).optional().or(z.literal("")),
    name: z.string().min(2).max(100).optional()
  }),
  params: emptyObject,
  query: emptyObject
});
