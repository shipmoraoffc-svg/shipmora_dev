import { z } from "zod";

const emptyObject = z.object({}).default({});

export const addToCartSchema = z.object({
  body: z.object({
    product_id: z.uuid(),
    quantity: z.coerce.number().int().positive().max(100)
  }),
  params: emptyObject,
  query: emptyObject
});

export const cartItemSchema = z.object({
  body: emptyObject,
  params: z.object({
    productId: z.uuid()
  }),
  query: emptyObject
});
