// src/components/OrderList.jsx
import React from 'react';
import styles from '../styles/OrderList.module.css';

export default function OrderList({ orders, onSelect }) {
  return (
    <div className={styles.orderList}>
      {orders.map(o => (
        <div
          key={o.id}
          className={styles.orderItem}
          onClick={()=>onSelect(o)}
        >
          <p><strong>{o.orderNumber}</strong></p>
          <p>Status: {o.status}</p>
          <p>Total: ${o.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
