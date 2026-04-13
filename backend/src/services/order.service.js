import { supabaseAdmin } from "../config/supabase.js";
import { ApiError } from "../utils/apiError.js";
import { createAuditLog } from "./audit.service.js";

const getOrderById = async (userId, orderId) => {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id, total_amount, status, created_at, order_items(id, product_id, quantity, price)")
    .eq("user_id", userId)
    .eq("id", orderId)
    .single();

  if (error) {
    throw new ApiError(404, "Order not found");
  }

  return data;
};

export const createOrder = async (userId) => {
  const { data, error } = await supabaseAdmin.rpc("create_order_from_cart", {
    p_user_id: userId
  });

  if (error) {
    throw new ApiError(400, error.message);
  }

  await createAuditLog({ userId, action: "orders.create", metadata: { orderId: data } });
  return getOrderById(userId, data);
};

export const listOrders = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id, total_amount, status, created_at, order_items(id, product_id, quantity, price)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new ApiError(500, "Unable to fetch orders");
  }

  return data;
};
