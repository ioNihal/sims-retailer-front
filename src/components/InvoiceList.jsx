// src/components/InvoiceList.jsx
import React from 'react';
import styles from '../styles/InvoiceList.module.css';

const InvoiceList = ({ invoices, selectedInvoices, toggleInvoiceSelection, onSelect }) => {
  return (
    <div className={styles.invoiceList}>
      {invoices.map(invoice => (
        <div key={invoice.id} className={styles.invoiceItem} onClick={() => onSelect(invoice)}>
          <input
            type="checkbox"
            checked={selectedInvoices.includes(invoice.id)}
            onChange={() => toggleInvoiceSelection(invoice.id)}
            className={styles.checkbox}
          />
          <div
            className={styles.invoiceContent}
          >
            <p><strong>{invoice.invoiceNumber}</strong></p>
            <p>Total: ${invoice.total.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
