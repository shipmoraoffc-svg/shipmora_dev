import { z } from "zod";

export const productListSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(12),
    search: z.string().max(100).optional()
  })
});

export const productIdSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    productId: z.uuid()
  }),
  query: z.object({}).default({})
});
