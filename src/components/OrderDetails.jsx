// src/components/OrderDetails.jsx
import React from 'react';
import styles from '../styles/OrderDetails.module.css';

export default function OrderDetails({ order, onCancel }) {
  return (
    <div className={styles.orderDetails}>
      <h3>Order Details: {order.orderNumber}</h3>
      <p><strong>Items:</strong> {order.items.join(', ')}</p>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      <p><strong>Status:</strong> {order.status}</p>
      {order.status==='pending' && (
        <button
          className={styles.cancelButton}
          onClick={()=>onCancel(order.id)}
        >
          Cancel Order
        </button>
      )}
    </div>
  );
}
