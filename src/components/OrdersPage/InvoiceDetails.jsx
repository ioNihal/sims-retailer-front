// src/components/InvoiceDetails.jsx
import React from 'react';
import styles from '../../styles/Orders/InvoiceDetails.module.css';

export default function InvoiceDetails({ invoice }) {
  return (
    <div className={styles.invoiceDetails}>
      <h3>Invoice Details: {invoice.invoiceNumber}</h3>
      <p>{invoice.orderDetails}</p>
      <p><strong>Total:</strong> ${invoice.total.toFixed(2)}</p>
    </div>
  );
}
