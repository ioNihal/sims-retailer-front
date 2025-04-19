// src/components/ProductList.jsx
import React from 'react';
import styles from '../../styles/Home/ProductList.module.css';

export default function ProductList({ products, addToCart }) {
  return (
    <div className={styles.productList}>
      {products.map(p => (
        <div key={p.id} className={styles.productCard}>
          <h3 className={styles.title}>{p.productName}</h3>
          <p><strong>Category:</strong> {p.category}</p>
          <p><strong>Price:</strong> ${p.productPrice.toFixed(2)}</p>
          <p><strong>Stocks Left:</strong> {p.quantity}</p>
          <p><strong>Seller:</strong> {p.seller}</p>
          <button className={styles.addButton} onClick={()=>addToCart(p)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
