// src/components/HomePage/ProductList.jsx
import React, { useState } from 'react';
import styles from '../../styles/Home/ProductList.module.css';

export default function ProductList({ products, addToCart }) {

  const [quantities, setQuantities] = useState({});


  return (
    <div className={styles.productList}>
      {products.map(p => {
        const qty = quantities[p._id] || 0;

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
              <button
                className={styles.plusBtn}
                onClick={() =>
                  setQuantities(prev => ({
                    ...prev,
                    [p._id]: Math.min((prev[p._id] || 0) + 1, p.quantity)
                  }))
                }
              >
                +
              </button>

              <input
                type="number"
                min={0}
                max={p.quantity}
                value={qty}
                onChange={(e) =>
                  setQuantities(prev => ({
                    ...prev,
                    [p._id]: Math.min(Math.max(0, parseInt(e.target.value) || 0), p.quantity)
                  }))
                }
              />

              <button
                className={styles.minusBtn}
                onClick={() =>
                  setQuantities(prev => ({
                    ...prev,
                    [p._id]: Math.max((prev[p._id] || 0) - 1, 0)
                  }))
                }
                disabled={qty === 0}
              >
                -
              </button>
            </div>

            <button
              className={styles.addButton}
              onClick={() => addToCart({ ...p, quantity: qty })}
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
