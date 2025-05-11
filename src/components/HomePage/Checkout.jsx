
import React from 'react';
import styles from '../../styles/Home/Checkout.module.css';
import { capitalize } from '../../utils/validators';

export default function Checkout({ cartItems, confirmOrder, goBack, loading, error }) {
  const total = cartItems
    .reduce((sum, p) => sum + p.productPrice * (p.quantity || 1), 0)
    .toFixed(2);
  return (
    <div className={styles.checkout}>
      <h2>Order Confirmation</h2>
      <ul className={styles.orderList}>
        {cartItems.map((item, i) => (
          <li key={i}>
             {capitalize(item.productName)} — &#8377;{(item.productPrice || 0).toFixed(2)} x {item.quantity || 1}
          </li>
        ))}
      </ul>
      <p className={styles.total}>
        <strong>Total:</strong> &#8377;{total}
      </p>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.btnGroup}>
        <button onClick={confirmOrder} className={styles.confirmButton} disabled={loading}>
          {loading ? 'Placing Order…' : 'Confirm Order'}
        </button>
        <button onClick={goBack} className={styles.backButton}>
          Back to Cart
        </button>
      </div>
    </div>
  );
}
