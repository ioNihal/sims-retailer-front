// src/components/InvoiceList.jsx
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
          key={inv.id}
          className={styles.invoiceItem}
          onClick={() => onSelect(inv)}           
        >
          <input
            type="checkbox"
            checked={selectedInvoices.includes(inv.id)}
            onChange={e => {
              e.stopPropagation();               
              toggleInvoiceSelection(inv.id);
            }}
            onClick={e => e.stopPropagation()} 
            className={styles.checkbox}
          />
          <div className={styles.invoiceContent}>
            <p><strong>{inv.invoiceNumber}</strong></p>
            <p>Total: ${inv.total.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
