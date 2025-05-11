
import callApi from "./_callApi";
import { getCustomerId } from "./_auth";

/**
 * Fetch all invoices for the current customer.
 * @returns {Promise<Array>} Array of invoice objects
 */
export async function getInvoices() {
  const customerId = getCustomerId();
  if (!customerId) return [];
  const { invoice = [] } = await callApi(`/api/invoice/customer/${customerId}`);
  return Array.isArray(invoice) ? invoice : [];
}

/**
 * Update payment details on an invoice.
 * @param {string} invoiceId
 * @param {{ method: string, transId: string, transDate: string }} payload
 * @returns {Promise<Object>} Updated invoice object
 */
export async function updateInvoicePayment(invoiceId, { method, transId, transDate }) {
  const { invoice } = await callApi(`/api/invoice/payment/${invoiceId}`, {
    method: "PATCH",
    body: { method, transId, transDate },
  });
  return invoice;
}
