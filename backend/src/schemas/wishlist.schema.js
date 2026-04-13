import { z } from "zod";

const emptyObject = z.object({}).default({});

export const wishlistCreateSchema = z.object({
  body: z.object({
    product_id: z.uuid()
  }),
  params: emptyObject,
  query: emptyObject
});

export const wishlistItemSchema = z.object({
  body: emptyObject,
  params: z.object({
    productId: z.uuid()
  }),
  query: emptyObject
});
