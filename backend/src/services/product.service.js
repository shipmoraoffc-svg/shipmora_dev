import { supabaseAdmin } from "../config/supabase.js";
import { ApiError } from "../utils/apiError.js";

export const listProducts = async ({ page, limit, search }) => {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabaseAdmin
    .from("products")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, count, error } = await query;

  if (error) {
    throw new ApiError(500, "Unable to fetch products");
  }

  return {
    items: data,
    pagination: {
      page,
      limit,
      total: count ?? 0
    }
  };
};

export const getProductById = async (productId) => {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    throw new ApiError(404, "Product not found");
  }

  return data;
};
