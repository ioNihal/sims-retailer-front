import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/HomePage/ProductList';
import Cart from '../components/HomePage/Cart';
import Checkout from '../components/HomePage/Checkout';
import styles from '../styles/Home/Home.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://suims.vercel.app/api/inventory/customer')
      .then(r => r.json())
      .then(data => {
        setProducts(data.inventory);
        setFiltered(data.inventory);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setFiltered(
      products.filter(p =>
        p.productName.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.supplierName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  const add = product => {
    setCart(c => [...c, product]);
  };

  const remove = id => {
    setCart(c => c.filter(item => item._id !== id));
  };

  const proceed = () => {
    setError(null);
    setCheckout(true);
  };
  const goBack = () => {
    setError(null);
    setCheckout(false);
  };


  const confirm = async () => {
    setLoading(true);
    setError(null);

    try {
      // 1) get your customerId however you store it
      const customerId = localStorage.getItem('customerId') || "680358d0c0eba9f5d5cc86e0";
      if (!customerId) throw new Error('No customerId found in localStorage');

      // 2) build orderProducts array
      const orderProducts = cart.map(item => ({
        inventoryId: item._id,
        quantity: item.quantity,            
        price: item.productPrice,
        category: item.category
      }));


      // 3) sum up totalAmount
      const totalAmount = orderProducts
        .reduce((sum, p) => sum + p.price * p.quantity, 0)
        .toFixed(2);           

      // 4) hit the API
      const res = await fetch(
        'https://suims.vercel.app/api/orders/',    
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId, totalAmount, orderProducts })
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      // 5) on success: reset
      setCart([]);
      setCheckout(false);
      setActiveTab('products');
      alert('✅ Order placed successfully');
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.actions}>
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search products..."
        />
        <div className={styles.tabButtons}>
          <button
            className={activeTab === 'products' ? styles.active : ''}
            onClick={() => {
              setActiveTab('products');
              setCheckout(false);
              setError(null);
            }}
          >
            Products
          </button>
          <button
            className={activeTab === 'cart' ? styles.active : ''}
            onClick={() => {
              setActiveTab('cart');
              setError(null);
            }}
          >
            Cart {cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
          </button>
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'products' ? (
          <div className={styles.contentPane}>
            {filtered.length > 0 ? (
              <ProductList products={filtered} addToCart={add} />
            ) : (
              <p className={styles.empty}>No products found.</p>
            )}
          </div>
        ) : (
          <div className={styles.contentPane}>
            {checkout ? (
              <Checkout
                cartItems={cart}
                confirmOrder={confirm}
                goBack={goBack}
                loading={loading}
                error={error}
              />
            ) : cart.length > 0 ? (
              <Cart
                cartItems={cart}
                removeFromCart={remove}
                proceedToCheckout={proceed}
              />
            ) : (
              <p className={styles.empty}>Your cart is empty.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
