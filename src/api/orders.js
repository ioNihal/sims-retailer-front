// src/api/orders.js
const API_BASE = "https://suims.vercel.app/api/orders";


function getCustomerId() {
    return JSON.parse(localStorage.getItem('user')).id;
}

/**
 * Fetch all orders for a given customerId (token)
 */
export async function getOrders() {
    const customerId = getCustomerId();
    if (!customerId) return [];
    const res = await fetch(`${API_BASE}?customerId=${customerId}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message || "Failed to fetch orders");
    // assume API returns { orders: [...] }
    return Array.isArray(json.orders) ? json.orders : [];
}

/** Create a new order */
export async function createOrder({ totalAmount, orderProducts }) {
    const customerId = getCustomerId();
    if (!customerId) throw new Error("No customerId in localStorage");
    const res = await fetch(`${API_BASE}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, totalAmount, orderProducts })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error?.message || "Order creation failed");
    return json;
}


/**
 * Cancel a pending order.
 * Hits: PATCH /api/orders/cancel/:orderId
 */
export async function cancelOrder(orderId) {
  const res = await fetch(`${API_BASE}/cancel/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" }
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to cancel order");
  return json;
}
