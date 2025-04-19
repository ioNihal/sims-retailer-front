// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/HomeComponents/ProductList';
import Cart from '../components/HomeComponents/Cart';
import Checkout from '../components/HomeComponents/Checkout';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    fetch('/api/inventory/customer')
      .then(r => r.json())
      .then(data => {
        setProducts(data.inventory);
        setFiltered(data.inventory);
      });
  }, []);

  useEffect(() => {
    setFiltered(
      products.filter(p =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  const add = p => setCart(c => [...c, p]);
  const remove = id => setCart(c => c.filter(x => x.id !== id));
  const proceed = () => setCheckout(true);
  const confirm = () => {
    alert('Order Confirmed!');
    setCart([]); setCheckout(false);
  };
  const goBack = () => setCheckout(false);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.tabButtons}>
        <button
          className={activeTab==='products'? styles.active : ''}
          onClick={()=>{ setActiveTab('products'); setCheckout(false); }}
        >
          Products
        </button>
        <button
          className={activeTab==='cart'? styles.active : ''}
          onClick={()=> setActiveTab('cart')}
        >
          Cart {cart.length>0 && <span className={styles.badge}>{cart.length}</span>}
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab==='products' && (
          <div className={styles.contentPane}>
            <SearchBar value={search} onChange={setSearch} />
            {filtered.length>0
              ? <ProductList products={filtered} addToCart={add}/>
              : <p className={styles.empty}>No products found.</p>
            }
          </div>
        )}
        {activeTab==='cart' && (
          <div className={styles.contentPane}>
            {checkout
              ? <Checkout cartItems={cart} confirmOrder={confirm} goBack={goBack}/>
              : (cart.length>0
                  ? <Cart cartItems={cart} removeFromCart={remove} proceedToCheckout={proceed}/>
                  : <p className={styles.empty}>Your cart is empty.</p>
                )
            }
          </div>
        )}
      </div>
    </div>
  );
}
