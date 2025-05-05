// src/components/OrdersPage/InvoiceDetails.jsx
import React, { useState } from 'react';
import styles from '../../styles/Orders/InvoiceDetails.module.css';
import { capitalize, formatDate } from '../../utils/validators';
import { exportFunc } from '../../utils/exportFunc';
import { updateInvoicePayment } from '../../api/invoice';
import toast from 'react-hot-toast';

export default function InvoiceDetails({ invoice, ordersData, onOrderClick }) {
  const [editing, setEditing] = useState(false);
  const [method, setMethod] = useState(invoice?.method || '');
  const [transId, setTransId] = useState(invoice?.transactionId || '');
  const [transDate, setTransDate] = useState(
    invoice?.transactionDate?.slice(0, 10) || ''
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!invoice) return <p>No invoice selected.</p>;

  const fullOrders = ordersData.filter(o => invoice.orders.includes(o._id));

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      const isoDate = new Date(transDate).toISOString();
      const payload = { method, transDate: isoDate };
      if (method !== 'cash') payload.transId = transId;

      const updated = await updateInvoicePayment(invoice._id, payload);

      invoice.method = updated.method;
      invoice.transactionId = updated.transactionId;
      invoice.transactionDate = updated.transactionDate;
      toast.success("Invoice payment updated successfully!")
      setEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Invoice payment update failed!")
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    const invoiceWithDetails = { ...invoice, orders: fullOrders };
    try {
      exportFunc([invoiceWithDetails], [invoice._id]);
    } catch (err) {
      console.error("Export failed:", err);
      toast.error(err.message || 'Invoice export failed');
    }
  };

  const saveDisabled =
    !method ||
    !transDate ||
    (method !== 'cash' && !transId);

  return (
    <div className={styles.invoiceDetails}>
      <div className={styles.btnWrapper}>
        <h3>Invoice #{invoice._id}</h3>
        <button className={styles.exportBtn} onClick={handleExport}>
          Export Invoice
        </button>
      </div>

      <p><strong>Status:</strong> {capitalize(invoice.status)}</p>
      <p><strong>Amount:</strong> ₹{invoice.amount.toFixed(2)}</p>
      <p><strong>Due Date:</strong> {formatDate(invoice.dueDate)}</p>
      <p><strong>Created:</strong> {formatDate(invoice.createdAt)}</p>
      <p><strong>Updated:</strong> {formatDate(invoice.updatedAt)}</p>

      {invoice.method && !editing ? (
        <>
          <p><strong>Method:</strong> {invoice.method}</p>
          <p><strong>Transaction ID:</strong> {invoice.method === 'cash' ? 'N/A' : invoice.transactionId}</p>
          <p><strong>Transaction Date:</strong> {invoice.transactionDate ? formatDate(invoice.transactionDate) : 'N/A'}</p>
          {/* {invoice.status !== 'paid' && (
            <button className={styles.paymentBtn} onClick={() => setEditing(true)}>Edit Payment Details</button>
          )} */}
        </>
      ) : editing ? (
        <div className={styles.paymentForm}>
          <h4>Enter Payment Details</h4>
          {error && <p className={styles.error}>{error}</p>}

          <label>
            Method:
            <select value={method} onChange={e => setMethod(e.target.value)}>
              <option value="">Select…</option>
              <option value="bank">Bank</option>
              <option value="upi">UPI</option>
              <option value="cash">Cash</option>
            </select>
          </label>

          {method !== 'cash' && (
            <label>
              Transaction ID:
              <input
                type="text"
                value={transId}
                onChange={e => setTransId(e.target.value)}
              />
            </label>
          )}

          <label>
            Transaction Date:
            <input
              type="date"
              value={transDate}
              onChange={e => {
                const selectedDate = e.target.value;
                const today = new Date().toISOString().split('T')[0];
                setTransDate(selectedDate > today ? today : selectedDate);
              }}
              max={new Date().toISOString().split('T')[0]}
            />
          </label>

          <div className={styles.btnGroup}>
            <button onClick={handleSave} disabled={saveDisabled}>
              {`${saving ? 'Saving…' : 'Save Payment'}`}
            </button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className={styles.paymentBtn} onClick={() => setEditing(true)}>Add Payment Details</button>
      )}

      {fullOrders.length > 0 && (
        <div className={styles.ordersSection}>
          <h4>Orders</h4>
          <ul>
            {fullOrders.map(o => (
              <li key={o._id} onClick={() => onOrderClick(o._id)}>
                Order Id #{o._id}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
