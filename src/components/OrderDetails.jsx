// src/components/OrderDetails.jsx
import React from 'react';
import styles from '../styles/OrderDetails.module.css';

const OrderDetails = ({ order, onCancel }) => {
  return (
    <div className={styles.orderDetails}>
      <h3>Order Details: {order.orderNumber}</h3>
      <p><strong>Items:</strong> {order.items.join(', ')}</p>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      <p><strong>Status:</strong> {order.status}</p>
      {order.status === 'pending' && (
        <button onClick={() => onCancel(order.id)} className={styles.cancelButton}>
          Cancel Order
        </button>
      )}
    </div>
  );
};

export default OrderDetails;
