// src/components/OrdersPage/InvoiceList.jsx
import React from 'react';
import styles from '../../styles/Orders/InvoiceList.module.css';
import { formatDate } from '../../utils/validators';

export default function InvoiceList({ invoices, onSelect }) {
  if (!invoices.length) return <div className={styles.noInvoices}>No invoices found.</div>;

  const sortedInvoices = [...invoices].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );


  return (
    <div className={styles.invoiceList}>
      {sortedInvoices.map(inv => (
        <div
          key={inv._id}
          className={styles.invoiceItem}
          onClick={() => onSelect(inv)}
        >
          <div className={styles.invoiceContent}>
            <p><strong>Invoice:</strong> {inv._id}</p>
            <p><strong>Total:</strong> ₹{inv.amount.toFixed(2)}</p>
            <p><strong>Due:</strong> {formatDate(inv.dueDate)}</p>
            <p className={styles.status}>
              <strong>Status:</strong> {inv.status}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
