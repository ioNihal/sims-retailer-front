// src/components/OrdersPage/InvoiceDetails.jsx
import React from 'react';
import styles from '../../styles/Orders/InvoiceDetails.module.css';

export default function InvoiceDetails({ invoice }) {
  return (
    <div className={styles.invoiceDetails}>
      <h3>Invoice ID: {invoice._id}</h3>
      <p><strong>Status:</strong> {invoice.status}</p>
      <p><strong>Amount:</strong> ₹{invoice.amount.toFixed(2)}</p>
      <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>

      {invoice.orders?.length > 0 && (
        <div className={styles.ordersSection}>
          <h4>Order IDs</h4>
          <ul>
            {invoice.orders.map(oid => (
              <li key={oid}>{oid}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
