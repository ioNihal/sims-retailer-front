// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  // Simulate fetching products from backend
  useEffect(() => {
    const sampleProducts = [
      { id: 1, name: 'Product A', category: 'Electronics', price: 99.99, stock: 10, seller: 'Seller One' },
      { id: 2, name: 'Product B', category: 'Clothing', price: 49.99, stock: 5, seller: 'Seller Two' },
      { id: 3, name: 'Product C', category: 'Accessories', price: 19.99, stock: 20, seller: 'Seller Three' },
      // Add more products as needed
    ];
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  // Update filtered products when search term changes
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const proceedToCheckout = () => {
    setCheckoutVisible(true);
  };

  const confirmOrder = () => {
    // In a real app, send the order to the backend
    alert('Order Confirmed!');
    setCartItems([]);
    setCheckoutVisible(false);
  };

  const goBackFromCheckout = () => {
    setCheckoutVisible(false);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.leftPane}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ProductList products={filteredProducts} addToCart={addToCart} />
      </div>
      <div className={styles.rightPane}>
        {checkoutVisible ? (
          <Checkout 
            cartItems={cartItems} 
            confirmOrder={confirmOrder} 
            goBack={goBackFromCheckout} 
          />
        ) : (
          <Cart 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            proceedToCheckout={proceedToCheckout} 
          />
        )}
      </div>
    </div>
  );
};

export default Home;
