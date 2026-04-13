import { supabaseAdmin } from "../config/supabase.js";
import { ApiError } from "../utils/apiError.js";
import { createAuditLog } from "./audit.service.js";

export const addToWishlist = async (userId, productId) => {
  const { error } = await supabaseAdmin.from("wishlist").upsert(
    {
      user_id: userId,
      product_id: productId
    },
    { onConflict: "user_id,product_id" }
  );

  if (error) {
    throw new ApiError(500, "Unable to add item to wishlist");
  }

  await createAuditLog({ userId, action: "wishlist.add", metadata: { productId } });
  return getWishlist(userId);
};

export const getWishlist = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from("wishlist")
    .select("id, product_id, products!inner(id, name, description, price, stock)")
    .eq("user_id", userId)
    .order("id", { ascending: false });

  if (error) {
    throw new ApiError(500, "Unable to fetch wishlist");
  }

  return data;
};

export const removeFromWishlist = async (userId, productId) => {
  const { error } = await supabaseAdmin
    .from("wishlist")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);

  if (error) {
    throw new ApiError(500, "Unable to remove wishlist item");
  }

  await createAuditLog({ userId, action: "wishlist.remove", metadata: { productId } });
  return { removed: true };
};
