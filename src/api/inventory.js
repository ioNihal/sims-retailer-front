// src/api/inventory.js
import callApi from "./_callApi";

 /**
  * Fetch all inventory items visible to this customer.
  * @returns {Promise<Array>} Array of inventory objects
  */
 export async function getInventory() {
   const { inventory = [] } = await callApi("/api/inventory/customer");
   return Array.isArray(inventory) ? inventory : [];
 }
