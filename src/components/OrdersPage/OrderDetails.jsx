// src/components/OrdersPage/OrderDetails.jsx
import React from 'react';
import styles from '../../styles/Orders/OrderDetails.module.css';
import { capitalize, formatDate } from '../../utils/validators';

export default function OrderDetails({ order, onCancel }) {
  if (!order) return null;

  return (
    <div className={styles.orderDetails}>
      <h3>Order #{order._id}</h3>
      <p><strong>Status: </strong>
         <span className={order.status === "pending" ? styles.pending : order.status === "delivered" ? styles.delivered : styles.cancelled}>
          {capitalize(order.status)}
        </span>
      </p>
      <p><strong>Ordered On:</strong> {formatDate(order.createdAt)}</p>

      <p className={styles.total}>
        <strong>Total Amount:</strong> &#8377;{order.totalAmount.toFixed(2)}
      </p>

      <div className={styles.metaSection}>
        <p><strong>Invoice ID:</strong> {order.invoiceId}</p>
        <p><strong>Last Updated:</strong> {formatDate(order.updatedAt)}</p>
      </div>

      <div className={styles.productsSection}>
        {order.orderProducts.map(product => (
          <div key={product._id} className={styles.productDetails}>
            <p><strong>Product:</strong> {capitalize(product.inventoryId.productName)}</p>
            <p>Category: {capitalize(product.inventoryId.category)}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Unit Price: ₹{product.price}</p>
            <p>Subtotal: ₹{(product.price * product.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

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
