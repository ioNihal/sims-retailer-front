// src/components/OrderList.jsx
import React from 'react';
import styles from '../styles/OrderList.module.css';

const OrderList = ({ orders, onSelect }) => {
  return (
    <div className={styles.orderList}>
      {orders.map(order => (
        <div key={order.id} className={styles.orderItem} onClick={() => onSelect(order)}>
          <p><strong>{order.orderNumber}</strong></p>
          <p>Status: {order.status}</p>
          <p>Total: ${order.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
