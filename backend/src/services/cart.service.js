import { supabaseAdmin } from "../config/supabase.js";
import { ApiError } from "../utils/apiError.js";
import { createAuditLog } from "./audit.service.js";

export const addToCart = async (userId, payload) => {
  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("id, stock")
    .eq("id", payload.product_id)
    .single();

  if (productError || !product) {
    throw new ApiError(404, "Product not found");
  }

  if (payload.quantity > product.stock) {
    throw new ApiError(400, "Requested quantity exceeds available stock");
  }

  const { error } = await supabaseAdmin.from("cart").upsert(
    {
      user_id: userId,
      product_id: payload.product_id,
      quantity: payload.quantity
    },
    { onConflict: "user_id,product_id" }
  );

  if (error) {
    throw new ApiError(500, "Unable to update cart");
  }

  await createAuditLog({ userId, action: "cart.add", metadata: payload });
  return getCart(userId);
};

export const getCart = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from("cart")
    .select("id, quantity, product_id, products!inner(id, name, description, price, stock)")
    .eq("user_id", userId)
    .order("id", { ascending: false });

  if (error) {
    throw new ApiError(500, "Unable to fetch cart");
  }

  return data;
};

export const removeFromCart = async (userId, productId) => {
  const { error } = await supabaseAdmin
    .from("cart")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    throw new ApiError(500, "Unable to remove cart item");
  }

  await createAuditLog({ userId, action: "cart.remove", metadata: { productId } });
  return { removed: true };
};
