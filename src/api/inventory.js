// src/api/inventory.js
const API_BASE = "https://suims.vercel.app/api/inventory";

/**
 * Fetch all inventory items visible to this customer.
 */
export async function getInventory() {
  const res = await fetch(`${API_BASE}/customer`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "Failed to fetch inventory");
  return Array.isArray(json.inventory) ? json.inventory : [];
}
