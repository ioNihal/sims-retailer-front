
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import OrderList from '../components/OrdersPage/OrderList';
import InvoiceList from '../components/OrdersPage/InvoiceList';
import OrderDetails from '../components/OrdersPage/OrderDetails';
import InvoiceDetails from '../components/OrdersPage/InvoiceDetails';
import styles from '../styles/Orders/Orders.module.css';
import { useNavigate } from 'react-router-dom';
import RefreshButton from '../components/RefreshButton';
import { cancelOrder, getOrders } from '../api/orders';
import { getInvoices } from '../api/invoice';
import toast from 'react-hot-toast';

export default function Orders({ activeTab: initialTab = 'orders' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [ordersData, setOrders] = useState([]);
  const [invoiceData, setInvoices] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [invoicesLoading, setInvoicesLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const orders = await getOrders();
      setOrders(orders || []);
    } catch (err) {
toast.error(e.message);
      console.error(err.message);
    } finally {
      setOrdersLoading(false);
    }
  };

  const fetchInvoices = async () => {
    setInvoicesLoading(true);
    try {
      const invs = await getInvoices();
      setInvoices(invs || []);
    } catch (err) {
toast.error(e.message);
      console.error(err.message);
    } finally {
      setInvoicesLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchInvoices();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId);
      const fresh = await getOrders();
      setOrders(fresh);
      setSelectedOrder(null);
      toast.success("Order cancelled!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const switchTo = tab => {
    setActiveTab(tab);
    setSearchTerm('');
    setSelectedOrder(null);
    setSelectedInvoice(null);
  };

  const filteredOrders = ordersData.filter(order =>
    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order._id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredInvoices = invoiceData.filter(i =>
    i._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.status.toLowerCase().includes(searchTerm.toLowerCase())
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

  const isLoading = activeTab === 'orders' ? ordersLoading : invoicesLoading;

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
            loading={isLoading}
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
          {isLoading ? (
            <div className={styles.loading}>
               <div className={styles.spinner} />
            </div>
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
            <InvoiceDetails invoice={selectedInvoice} ordersData={ordersData} onOrderClick={goToOrder} />
          </div>
        )}
      </div>
    </div>
  );
}
