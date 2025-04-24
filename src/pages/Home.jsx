import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/HomePage/ProductList';
import Cart from '../components/HomePage/Cart';
import Checkout from '../components/HomePage/Checkout';
import styles from '../styles/Home/Home.module.css';
import { useNavigate } from 'react-router-dom';
import RefreshButton from '../components/RefreshButton';

export default function Home() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const r = await fetch('https://suims.vercel.app/api/inventory/customer');
      const data = await r.json();
      setProducts(data.inventory);
      setFiltered(data.inventory);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    } finally {

    }
  };

  useEffect(() => { fetchProducts(); }, []);

  useEffect(() => {
    setFiltered(
      products.filter(p =>
        p.productName.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.supplierName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);


  const addOrUpdate = (product, qty) => {
    setCart(c => {
      const exists = c.find(item => item._id === product._id);
      if (exists) {
        if (qty === 0) return c.filter(item => item._id !== product._id);
        return c.map(item =>
          item._id === product._id ? { ...item, quantity: qty } : item
        );
      } else {
        return qty > 0 ? [...c, { ...product, quantity: qty }] : c;
      }
    });
  };

  const proceed = () => { setError(null); setCheckout(true); };
  const goBack = () => { setError(null); setCheckout(false); };

  const confirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const customerId = localStorage.getItem('token');
      if (!customerId) throw new Error('No customerId in localStorage');

      const orderProducts = cart.map(i => ({
        inventoryId: i._id,
        quantity: i.quantity,
        price: i.productPrice,
        category: i.category
      }));
      const totalAmount = orderProducts
        .reduce((s, p) => s + p.price * p.quantity, 0)
        .toFixed(2);

      const res = await fetch('https://suims.vercel.app/api/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, totalAmount, orderProducts })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed');
      setCart([]);
      setCheckout(false);
      setActiveTab('products');
      navigate("/orders")
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.actions}>
       <div className={styles.leftWrapper}>
       <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
       <RefreshButton loading={loading} onClick={fetchProducts} />
       </div>
        <div className={styles.tabButtons}>
          <button className={activeTab === 'products' ? styles.active : ''}
            onClick={() => { setActiveTab('products'); setCheckout(false); setError(null); }}>
            Products
          </button>
          <button className={activeTab === 'cart' ? styles.active : ''}
            onClick={() => { setActiveTab('cart'); setError(null); }}>
            Cart {cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
          </button>
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'products' ? (
          <div className={styles.contentPane}>
            {loading ? <p className={styles.loading}>Loading...</p> :
              filtered.length > 0
                ? <ProductList products={filtered} cart={cart} updateCart={addOrUpdate} />
                : <p className={styles.empty}>No products found.</p>}
          </div>
        ) : (
          <div className={styles.contentPane}>
            {checkout
              ? <Checkout cartItems={cart} confirmOrder={confirm} goBack={goBack} loading={loading} error={error} />
              : cart.length > 0
                ? <Cart cartItems={cart} removeFromCart={id => addOrUpdate({ _id: id }, 0)} proceedToCheckout={proceed} />
                : <p className={styles.empty}>Your cart is empty.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
