// src/components/OrdersPage/OrderList.jsx
import React from 'react';
import styles from '../../styles/Orders/OrderList.module.css';
import { capitalize } from '../../utils/validators';

export default function OrderList({ orders, onSelect }) {
  if (!orders || !orders.length) return <p>No orders found!</p>;

  return (
    <div className={styles.orderList}>
      {orders.map(o => (
        <div
          key={o._id}          
          className={styles.orderItem}
          onClick={()=>onSelect(o)}
        >
          <p><strong>Order ID: {o._id}</strong></p>
          <p>Status: {capitalize(o.status)}</p>
          <p>Total: ₹{o.totalAmount.toFixed(2)} Qty: {o.orderProducts.length}</p>
        </div>
      ))}
    </div>
  );
}
