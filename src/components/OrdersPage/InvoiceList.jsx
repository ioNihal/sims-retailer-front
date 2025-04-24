// src/components/OrdersPage/InvoiceList.jsx
import React from 'react';
import styles from '../../styles/Orders/InvoiceList.module.css';
import { formatDate } from '../../utils/validators';

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
          className={`${styles.invoiceItem} ${selectedInvoices.includes(inv._id) ? styles.selected : ''}`}
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
