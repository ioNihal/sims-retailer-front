// src/components/Checkout.jsx
import React from 'react';
import styles from '../styles/Checkout.module.css';

const Checkout = ({ cartItems, confirmOrder, goBack }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className={styles.checkout}>
      <h2>Order Confirmation</h2>
      <ul className={styles.orderList}>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      <button onClick={confirmOrder} className={styles.confirmButton}>
        Confirm Order
      </button>
      <button onClick={goBack} className={styles.backButton}>
        Back to Cart
      </button>
    </div>
  );
};

export default Checkout;
