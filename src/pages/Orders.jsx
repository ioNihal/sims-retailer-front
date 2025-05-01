// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import OrderList from '../components/OrdersPage/OrderList';
import InvoiceList from '../components/OrdersPage/InvoiceList';
import OrderDetails from '../components/OrdersPage/OrderDetails';
import InvoiceDetails from '../components/OrdersPage/InvoiceDetails';
import styles from '../styles/Orders/Orders.module.css';
import { useNavigate } from 'react-router-dom';
import RefreshButton from '../components/RefreshButton';

export default function Orders({ activeTab: initialTab = 'orders' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [ordersData, setOrders] = useState([]);
  const [invoiceData, setInvoices] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const customerId = localStorage.getItem('token');
    if (!customerId) return;
    setLoading(true);
    try {
      const res = await fetch(`https://suims.vercel.app/api/orders?customerId=${customerId}`);
      const json = await res.json();
      setOrders(json.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoices = async () => {
    const customerId = localStorage.getItem('token');
    if (!customerId) return;
    setLoading(true);
    try {
      const res = await fetch(`https://suims.vercel.app/api/invoice/customer/${customerId}`);
      const json = await res.json();
      setInvoices(json.invoice || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchInvoices();
  }, []);

  const handleCancel = async orderId => {
    if (!window.confirm('Really cancel this order?')) return;
    try {
      const res = await fetch(`https://suims.vercel.app/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'cancelled' })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Cancel failed');
      alert('Order cancelled');
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const switchTo = tab => {
    setActiveTab(tab);
    setSearchTerm('');
    setSelectedOrder(null);
    setSelectedInvoice(null);
  };

  const filteredOrders = ordersData.filter(order =>
    order.orderProducts.some(p =>
      p.inventoryId.productName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const filteredInvoices = invoiceData.filter(i =>
    i._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openOrder = o => setSelectedOrder(o);
  const openInvoice = i => setSelectedInvoice(i);
  const goBack = () => {
    if (activeTab === 'orders') setSelectedOrder(null);
    else setSelectedInvoice(null);
  };


  const goToOrder = (orderId) => {
    const order = ordersData.find(o => o._id === orderId);
    if (order) {
      setSelectedOrder(order);
      setActiveTab('orders'); 
      setSelectedInvoice(null);
    }
  };


  return (
    <div className={styles.ordersPage}>

      <div className={styles.actions}>
        <div className={styles.leftWrapper}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder={`Search ${activeTab}...`}
          />
          <RefreshButton
            onClick={activeTab === 'orders' ? fetchOrders : fetchInvoices}
            loading={loading}
          />
        </div>

        <div className={styles.tabButtons}>
          <button
            className={activeTab === 'orders' ? styles.active : ''}
            onClick={() => switchTo('orders')}
          >
            Orders
          </button>
          <button
            className={activeTab === 'invoices' ? styles.active : ''}
            onClick={() => switchTo('invoices')}
          >
            Invoices
          </button>
        </div>
      </div>

      <div className={`${styles.listContainer} ${(selectedOrder && activeTab === 'orders') ||
        (selectedInvoice && activeTab === 'invoices')
        ? styles.detailViewActive
        : ''
        }`}>
        <div className={styles.listPane}>
          {loading ? (
            <p className={styles.loading}>Loading…</p>
          ) : activeTab === 'orders' ? (
            filteredOrders.length > 0 ? (
              <OrderList orders={filteredOrders} onSelect={openOrder} />
            ) : (
              <p className={styles.empty}>No orders found.</p>
            )
          ) : (
            filteredInvoices.length > 0 ? (
              <InvoiceList
                invoices={filteredInvoices}
                onSelect={openInvoice}
              
              />
            ) : (
              <p className={styles.empty}>No invoices found.</p>
            )
          )}
        </div>

        {selectedOrder && activeTab === 'orders' && (
          <div className={styles.detailContainer}>
            <header className={styles.detailHeader}>
              <button className={styles.backButton} onClick={goBack}>
                Back
              </button>
            </header>
            <OrderDetails order={selectedOrder} onCancel={handleCancel} />
          </div>
        )}

        {selectedInvoice && activeTab === 'invoices' && (
          <div className={styles.detailContainer}>
            <header className={styles.detailHeader}>
              <button className={styles.backButton} onClick={goBack}>
                Back
              </button>
            </header>
            <InvoiceDetails invoice={selectedInvoice}  ordersData={ordersData} onOrderClick={goToOrder} />
          </div>
        )}
      </div>
    </div>
  );
}
