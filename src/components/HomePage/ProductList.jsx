// src/components/HomePage/ProductList.jsx
import React, { useState } from 'react';
import styles from '../../styles/Home/ProductList.module.css';

export default function ProductList({ products, addToCart }) {

  const [quantity, setQuantity] = useState(0);

  return (
    <div className={styles.productList}>
      {products.map(p => {
        // derive stock status purely from quantity vs threshold
        const stockStatus =
          p.quantity === 0
            ? 'out of stock'
            : p.quantity < p.threshold
              ? 'low stock'
              : 'in stock';

        const statusClass =
          p.quantity === 0
            ? styles.outOfStock
            : p.quantity < p.threshold
              ? styles.lowStock
              : styles.inStock;

        return (
          <div key={p._id} className={styles.productCard}>
            <h3 className={styles.title}>{p.productName}</h3>
            <p><strong>Category:</strong> {p.category}</p>
            <p><strong>Price:</strong> &#8377;{p.productPrice.toFixed(2)}</p>
            <p><strong>Stocks Left:</strong> {p.quantity}</p>
            <p><strong>Seller:</strong> {p.supplierName}</p>

            <p>
              <strong>Status:</strong>{' '}
              <span className={statusClass}>
                {stockStatus}
              </span>
            </p>

            {/* {stockStatus === 'low stock' && (
              <p className={styles.threshold}>
                <em>Reorder at:</em> {p.threshold} units
              </p>
            )} */}

            <div className={styles.actions}>
              <button className={styles.plusBtn} onClick={() => setQuantity(quantity + 1)}>+</button>
              <input type='number' min={0} value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              <button className={styles.minusBtn} onClick={() => setQuantity(quantity - 1)} disabled={quantity === 0}>-</button>
            </div>
            <button
              className={styles.addButton}
              onClick={() => addToCart({ ...p, quantity: quantity })}
              disabled={p.quantity === 0}
            >
              {p.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
