
import callApi from "./_callApi";
import { getCustomerId } from "./_auth";

/**
 * Fetch all orders for the current customer.
 * @returns {Promise<Array>} Array of order objects
 */
export async function getOrders() {
  const customerId = getCustomerId();
  if (!customerId) return [];
  
  const { orders = [] } = await callApi(
    `/api/orders?customerId=${customerId}`
  );
  return Array.isArray(orders) ? orders : [];
}

/**
 * Create a new order for the current customer.
 * @param {{ totalAmount: number, orderProducts: Array }} payload
 * @returns {Promise<Object>} Created order response
 */
export async function createOrder({ totalAmount, orderProducts }) {
  const customerId = getCustomerId();
  if (!customerId) throw new Error("No customerId in localStorage");

  const json = await callApi("/api/orders", {
    method: "POST",
    body: { customerId, totalAmount, orderProducts },
  });
  return json;
}

/**
 * Cancel a pending order.
 * @param {string} orderId
 * @returns {Promise<Object>} Cancellation response
 */
export async function cancelOrder(orderId) {
  const json = await callApi(`/api/orders/cancel/${orderId}`, {
    method: "PATCH",
  });
  return json;
}
