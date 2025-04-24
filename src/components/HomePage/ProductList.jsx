import React from 'react';
import styles from '../../styles/Home/ProductList.module.css';
import { capitalize } from '../../utils/validators';


function ProductCard({ product, quantity, onQuantityChange }) {
  const { _id, productName, category, productPrice, quantity: stock, threshold, supplierName } = product;

  const stockStatus =
    stock === 0 ? 'Out of Stock'
      : stock < threshold ? 'Low Stock'
        : 'In Stock';

  const statusClass =
    stock === 0 ? styles.outOfStock
      : stock < threshold ? styles.lowStock
        : styles.inStock;

  const decrement = () => {
    const next = Math.max(quantity - 1, 0);
    onQuantityChange(product, next);
  };
  const increment = () => {
    const next = Math.min(quantity + 1, stock);
    onQuantityChange(product, next);
  };

  return (
    <div className={styles.productCard}>
      <div>
        <h3 className={styles.title}>{capitalize(productName)}</h3>
        <p><strong>Category:</strong> {capitalize(category)}</p>
        <p><strong>Price:</strong> ₹{productPrice.toFixed(2)}</p>
        <p><strong>Stocks Left:</strong> {stock}</p>
        <p><strong>Seller:</strong> {capitalize(supplierName)}</p>
        <p><strong>Status:</strong> <span className={statusClass}>{stockStatus}</span></p>
      </div>
      <div className={styles.actions}>
        <div className={styles.stepper}>
          <button onClick={decrement} disabled={quantity <= 0} className={styles.stepperButton}>–</button>
          <input type="number"
            className={styles.stepperInput}
            value={quantity}
            title="Scroll to change quantity"
            min={0}
            max={stock}
            onChange={e => {
              const v = parseInt(e.target.value, 10) || 0;
              const next = Math.min(Math.max(v, 0), stock);
              onQuantityChange(product, next);
            }} />
          <button onClick={increment} disabled={quantity >= stock} className={styles.stepperButton}>+</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductList({ products, cart, updateCart }) {
  return (
    <div className={styles.productList}>
      {products.map(prod => {
        const qty = cart.find(i => i._id === prod._id)?.quantity || 0;
        return (
          <ProductCard
            key={prod._id}
            product={prod}
            quantity={qty}
            onQuantityChange={(p, v) => updateCart(p, v)}
          />
        );
      })}
    </div>
  );
}
