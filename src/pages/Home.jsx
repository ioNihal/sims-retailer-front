// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/HomeComponents/ProductList';
import Cart from '../components/HomeComponents/Cart';
import Checkout from '../components/HomeComponents/Checkout';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'cart'
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
    ];
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  // Filter products by search term
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
    alert('Order Confirmed!');
    setCartItems([]);
    setCheckoutVisible(false);
  };

  const goBackFromCheckout = () => {
    setCheckoutVisible(false);
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.tabButtons}>
        <button
          className={activeTab === 'products' ? styles.active : ''}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={activeTab === 'cart' ? styles.active : ''}
          onClick={() => setActiveTab('cart')}
        >
          Cart {cartItems.length > 0 && <span className={styles.badge}>{cartItems.length}</span>}
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'products' && (
          <div className={styles.contentPane}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {filteredProducts.length > 0 ? (
              <ProductList products={filteredProducts} addToCart={addToCart} />
            ) : (
              <p className={styles.emptyMessage}>No products found.</p>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className={styles.contentPane}>
            {checkoutVisible ? (
              <Checkout 
                cartItems={cartItems} 
                confirmOrder={confirmOrder} 
                goBack={goBackFromCheckout} 
              />
            ) : (
              <>
                {cartItems.length > 0 ? (
                  <Cart 
                    cartItems={cartItems} 
                    removeFromCart={removeFromCart} 
                    proceedToCheckout={proceedToCheckout} 
                  />
                ) : (
                  <p className={styles.emptyMessage}>Your cart is empty.</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
