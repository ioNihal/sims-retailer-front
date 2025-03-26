// src/components/ProductList.jsx
import React from 'react';
import styles from '../styles/ProductList.module.css';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className={styles.productList}>
      {products.map(product => (
        <div key={product.id} className={styles.productCard}>
          <h3>{product.name}</h3>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Stocks Left:</strong> {product.stock}</p>
          <p><strong>Seller:</strong> {product.seller}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
