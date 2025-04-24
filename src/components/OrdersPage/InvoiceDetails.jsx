// src/components/OrdersPage/InvoiceDetails.jsx
import React from 'react';
import styles from '../../styles/Orders/InvoiceDetails.module.css';
import { formatDate } from '../../utils/validators';

export default function InvoiceDetails({ invoice }) {
  if (!invoice) return <p>No invoice selected.</p>;

  return (
    <div className={styles.invoiceDetails}>
      <h3>Invoice #{invoice._id}</h3>
      <p><strong>Status:</strong> {invoice.status}</p>
      <p><strong>Amount:</strong> ₹{invoice.amount.toFixed(2)}</p>
      <p><strong>Due Date:</strong> {formatDate(invoice.dueDate)}</p>
      <p><strong>Created:</strong> {formatDate(invoice.createdAt)}</p>
      <p><strong>Updated:</strong> {formatDate(invoice.updatedAt)}</p>

      {invoice.method && (
        <p><strong>Method:</strong> {invoice.method}</p>
      )}
      {invoice.transactionId && (
        <p><strong>Transaction ID:</strong> {invoice.transactionId}</p>
      )}
      {invoice.transactionDate && (
        <p><strong>Transaction Date:</strong> {formatDate(invoice.transactionDate)}</p>
      )}

      {invoice.orders?.length > 0 && (
        <div className={styles.ordersSection}>
          <h4>Orders</h4>
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
