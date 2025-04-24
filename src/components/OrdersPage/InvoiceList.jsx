// src/components/OrdersPage/InvoiceList.jsx
import React from 'react';
import styles from '../../styles/Orders/InvoiceList.module.css';

export default function InvoiceList({
  invoices,
  selectedInvoices,
  toggleInvoiceSelection,
  onSelect
}) {
  return (
    <div className={styles.invoiceList}>
      {invoices.map(inv => (
        <div
          key={inv._id}
          className={styles.invoiceItem}
          onClick={() => onSelect(inv)}
        >
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={selectedInvoices.includes(inv._id)}
            onChange={e => {
              e.stopPropagation();
              toggleInvoiceSelection(inv._id);
            }}
            onClick={e => e.stopPropagation()}
          />
          <div className={styles.invoiceContent}>
            <p><strong>Invoice ID: {inv._id}</strong></p>
            <p>Total: ₹{inv.amount.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
