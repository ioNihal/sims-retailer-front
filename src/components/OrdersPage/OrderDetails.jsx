// src/components/OrderDetails.jsx
import React from 'react';
import styles from '../../styles/Orders/OrderDetails.module.css';

export default function OrderDetails({ order, onCancel }) {
  if (!order) return null;

  return (
    <div className={styles.orderDetails}>
      <h3>Order #{order._id}</h3>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>

      <div className={styles.productsSection}>
        {order.orderProducts.map(product => (
          <div key={product._id} className={styles.productDetails}>
            <p><strong>Product:</strong> {product.inventoryId.productName}</p>
            <p>Category: {product.inventoryId.category}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ₹{product.price}</p>
            <p>Subtotal: ₹{(product.price * product.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <p className={styles.total}><strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>

      {order.status === 'pending' && (
        <button
          className={styles.cancelButton}
          onClick={() => onCancel(order._id)}
        >
          Cancel Order
        </button>
      )}
    </div>
  );
}
