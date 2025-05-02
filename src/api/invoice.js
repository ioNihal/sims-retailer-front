// src/api/invoice.js
const API_BASE = 'https://suims.vercel.app';


function getCustomerId() {
  return JSON.parse(localStorage.getItem('user')).id;
}

export async function getInvoices() {
  const customerId = getCustomerId();
  if (!customerId) return [];
  const res = await fetch(`${API_BASE}/api/invoice/customer/${customerId}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || "Failed to fetch invoices");
  return Array.isArray(json.invoice) ? json.invoice : [];
}


export async function updateInvoicePayment(invoiceId, { method, transId, transDate }) {
  const res = await fetch(`${API_BASE}/api/invoice/payment/${invoiceId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method, transId, transDate })
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message || 'Failed to update payment');
  return json.invoice;
}
