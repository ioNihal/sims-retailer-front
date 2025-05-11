
import React, { useState } from 'react';
import styles from '../../styles/Orders/OrderDetails.module.css';
import { capitalize, formatDate } from '../../utils/validators';
import ConfirmDialog from '../ConfirmDialog';


export default function OrderDetails({ order, onCancel }) {

  const [cancelling, setCancelling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  if (!order) return null;

  const handleCancel = async () => {
    setCancelling(true);
    await onCancel(order._id);
    setCancelling(false);
    setShowConfirm(false);
  };

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
            <p><strong>Product:</strong> {capitalize(product.name)}</p>
            <p>Category: {capitalize(product.category)}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Unit Price: ₹{product.price}</p>
            <p>Subtotal: ₹{(product.price * product.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {order.status === 'pending' && (
        <>
          <button
            className={styles.cancelButton}
            onClick={() => setShowConfirm(true)}
            disabled={cancelling}
          >
            {cancelling ? 'Cancelling…' : 'Cancel Order'}
          </button>

          {showConfirm && (
            <ConfirmDialog
              message="Are you sure you want to cancel this order?"
              onConfirm={handleCancel}
              onCancel={() => setShowConfirm(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
