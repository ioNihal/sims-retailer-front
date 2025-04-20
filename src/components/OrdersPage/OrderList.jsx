// src/components/OrderList.jsx
import React from 'react';
import styles from '../../styles/Orders/OrderList.module.css';

export default function OrderList({ orders, onSelect }) {
  if (!orders) return (
    <p>No orders found!</p>
  );
  
  return (
    <div className={styles.orderList}>
      {orders.map(o => (
        <div
          key={o.id}
          className={styles.orderItem}
          onClick={()=>onSelect(o)}
        >
          <p><strong>{o._id}</strong></p>
          <p>Status: {o.status}</p>
          <p>Total: &#8377; {o.totalAmount.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
