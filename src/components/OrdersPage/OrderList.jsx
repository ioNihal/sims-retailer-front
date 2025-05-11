
import React from 'react';
import styles from '../../styles/Orders/OrderList.module.css';
import { capitalize, formatDate } from '../../utils/validators';

export default function OrderList({ orders, onSelect }) {
  if (!orders || !orders.length) return <p>No orders found!</p>;

  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className={styles.orderList}>
      {sortedOrders.map(o => (
        <div
          key={o._id}
          className={styles.orderItem}
          onClick={() => onSelect(o)}
        >
          <p><strong>Order ID: {o._id}</strong></p>
          <p>Status: {capitalize(o.status)}</p>
          <p>Date: {formatDate(o.createdAt)}</p>
          <p>Quantity: {o.orderProducts.reduce((acc, cur) => acc + cur.quantity, 0)}</p>
          <p>Total: ₹{o.totalAmount.toFixed(2)} Products: {o.orderProducts.length}</p>
        </div>
      ))}
    </div>
  );
}
