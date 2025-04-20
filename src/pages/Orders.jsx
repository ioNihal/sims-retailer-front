import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import OrderList from '../components/OrdersPage/OrderList';
import InvoiceList from '../components/OrdersPage/InvoiceList';
import OrderDetail from '../components/OrdersPage/OrderDetails';
import InvoiceDetail from '../components/OrdersPage/InvoiceDetails';
import styles from '../styles/Orders/Orders.module.css';
import { orders, invoices } from '../../public/data';
import { exportFunc } from '../utils/exportFunc';

export default function Orders({ activeTab: initialTab = 'orders' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [ordersData, setOrders] = useState([]);
  const [invoiceData, setInvoices] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [exporting, setExporting] = useState(false);

  // NEW: track which record is open for detail
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    setOrders(orders);
    setInvoices(invoices);
  }, []);

  // clear detail when switching tabs
  const switchTo = tab => {
    setActiveTab(tab);
    setSearchTerm('');
    setSelectedOrder(null);
    setSelectedInvoice(null);
  };

  const filteredOrders = ordersData.filter(o =>
    o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredInvoices = invoiceData.filter(i =>
    i.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSelection = id =>
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

  const exportInvoices = () => {
    if (!selectedIds.length) { alert('Select at least one invoice.'); return; }
    setExporting(true);
    exportFunc(invoices, selectedIds)
    setExporting(false);
    setSelectedIds([]);
  };

  // handlers for detail/back
  const openOrder = o => setSelectedOrder(o);
  const openInvoice = i => setSelectedInvoice(i);
  const goBack = () => {
    if (activeTab === 'orders') setSelectedOrder(null);
    else setSelectedInvoice(null);
  };

  

  return (
    <div className={styles.ordersPage}>
      <div className={styles.actions}>
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={`Search ${activeTab}...`}
        />
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
        {activeTab === 'invoices' && filteredInvoices.length > 0 ? (
          <button
            className={styles.exportButton}
            onClick={exportInvoices}
            disabled={exporting || selectedIds.length === 0}
          >
            {exporting
              ? 'Exporting…'
              : `Export ${selectedIds.length || ''} Invoice${selectedIds.length === 1 ? '' : 's'}`}
          </button>
        ) : null}

      </div>


      <div
        className={`${styles.listContainer} ${(selectedOrder && activeTab === 'orders') ||
          (selectedInvoice && activeTab === 'invoices')
          ? styles.detailViewActive
          : ''
          }`}
      >

        <div
          className={`${styles.listPane}`}
        >
          {activeTab === 'orders' ? (
            <OrderList
              orders={filteredOrders}
              onSelect={openOrder}
            />
          ) : (
            <>
              <InvoiceList
                invoices={filteredInvoices}
                selectedInvoices={selectedIds}
                toggleInvoiceSelection={toggleSelection}
                onSelect={openInvoice}
              />
            </>
          )}
        </div>

        {/* DETAIL CARD */}
        {selectedOrder && activeTab === 'orders' && (
          <div className={styles.detailContainer}>
            <header className={styles.detailHeader}>
              <button className={styles.backButton} onClick={goBack}>
                Back
              </button>
            </header>
            <OrderDetail order={selectedOrder} />
          </div>
        )}

        {selectedInvoice && activeTab === 'invoices' && (
          <div className={styles.detailContainer}>
            <header className={styles.detailHeader}>
              <button className={styles.backButton} onClick={goBack}>
                Back
              </button>
            </header>
            <InvoiceDetail invoice={selectedInvoice} />
          </div>
        )}
      </div>
    </div>
  );
}
