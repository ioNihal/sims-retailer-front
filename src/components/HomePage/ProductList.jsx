// src/components/HomePage/ProductList.jsx
import React, { useState, useCallback } from 'react';
import styles from '../../styles/Home/ProductList.module.css';
import { capitalize } from '../../utils/validators';


function ProductCard({ product, quantity, onQuantityChange, onAddToCart }) {
  const { _id, productName, category, productPrice, quantity: stock, threshold, supplierName } = product;

  const stockStatus =
    stock === 0 ? 'Out of Stock'
    : stock < threshold ? 'Low Stock'
    : 'In Stock';

  const statusClass =
    stock === 0 ? styles.outOfStock
    : stock < threshold ? styles.lowStock
    : styles.inStock;

  const decrement = () => onQuantityChange(_id, Math.max(quantity - 1, 0));
  const increment = () => onQuantityChange(_id, Math.min(quantity + 1, stock));
  const handleInput = e => {
    const val = parseInt(e.target.value, 10) || 0;
    onQuantityChange(_id, Math.min(Math.max(val, 0), stock));
  };

  return (
    <div className={styles.productCard}>
      <div>
        <h3 className={styles.title}>{capitalize(productName)}</h3>
        <p><strong>Category:</strong> {capitalize(category)}</p>
        <p><strong>Price:</strong> ₹{productPrice.toFixed(2)}</p>
        <p><strong>Stocks Left:</strong> {stock}</p>
        <p><strong>Seller:</strong> {capitalize(supplierName)}</p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={statusClass}>{stockStatus}</span>
        </p>
      </div>

      <div className={styles.actions}>
        <div className={styles.stepper}>
          <button
            className={styles.stepperButton}
            onClick={decrement}
            disabled={quantity <= 0}
          >
            –
          </button>

          <input
            type="number"
            className={styles.stepperInput}
            value={quantity}
            onChange={handleInput}
            min={0}
            max={stock}
            disabled={stock <= 0}
          />

          <button
            className={styles.stepperButton}
            onClick={increment}
            disabled={quantity >= stock}
          >
            +
          </button>
        </div>

        <button
          className={styles.addButton}
          onClick={() => onAddToCart(product, quantity)}
          disabled={stock === 0 || quantity === 0}
        >
          {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default function ProductList({ products, addToCart }) {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = useCallback((id, value) => {
    setQuantities(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleAddToCart = useCallback((product, quantity) => {
    if (quantity > 0) addToCart({ ...product, quantity });
  }, [addToCart]);

  return (
    <div className={styles.productList}>
      {products.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          quantity={quantities[product._id] || 0}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
