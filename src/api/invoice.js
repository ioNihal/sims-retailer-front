// src/api/invoice.js
const API_BASE = 'https://suims.vercel.app';

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
