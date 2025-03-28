// src/components/InvoiceDetails.jsx
import React from 'react';
import styles from '../styles/InvoiceDetails.module.css';

const InvoiceDetails = ({ invoice, onClose }) => {
  return (
    <div className={styles.invoiceDetails}>
      <button className={styles.closeButton} onClick={onClose}>×</button>
      <h3>Invoice Details: {invoice.invoiceNumber}</h3>
      <p>{invoice.orderDetails}</p>
      <p><strong>Total:</strong> ${invoice.total.toFixed(2)}</p>
    </div>
  );
};

export default InvoiceDetails;
