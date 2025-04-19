// src/components/Cart.jsx
import React from 'react';
import styles from '../../styles/Home/Cart.module.css';

export default function Cart({ cartItems, removeFromCart, proceedToCheckout }) {

  const totalPrice = cartItems.reduce((total, item) => total + item.productPrice, 0);
  
  return (
    <div className={styles.cart}>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cartItems.map(item => (
              <li key={item.id} className={styles.cartItem}>
                <div>
                  <strong>{item.productName}</strong> - ${item.productPrice.toFixed(2)}
                </div>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>

          <div className={styles.total}>
            <strong>Total:</strong> ${totalPrice.toFixed(2)}
          </div>

          <button onClick={proceedToCheckout} className={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}
