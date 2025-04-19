// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import OrderList from '../components/OrdersPage/OrderList';
import InvoiceList from '../components/OrdersPage/InvoiceList';
import styles from '../styles/Orders/Orders.module.css';
import { orders, invoices } from '../../public/data';

export default function Orders({ activeTab: initialTab = 'orders' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();

  // src/pages/Orders.jsx
  useEffect(() => {
    setOrders(orders);
    setInvoices(invoices);
  }, []);

  const filteredOrders = orders.filter(o => o.orderNumber.toLowerCase().includes(searchTerm));
  const filteredInvoices = invoices.filter(i => i.invoiceNumber.toLowerCase().includes(searchTerm));

  const toggleSelection = id =>
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

  const exportInvoices = () => {
    if (!selectedIds.length) { alert('Select at least one invoice.'); return; }
    setExporting(true);
    // jsPDF logic…
    setExporting(false);
    setSelectedIds([]);
  };

  return (
    <div className={styles.ordersPage}>
      <div className={styles.tabButtons}>
        <button
          className={activeTab === 'orders' ? styles.active : ''}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={activeTab === 'invoices' ? styles.active : ''}
          onClick={() => setActiveTab('invoices')}
        >
          Invoices
        </button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className={styles.listContainer}>
        {activeTab === 'orders' ? (
          <OrderList
            orders={filteredOrders}
            onSelect={o => navigate(`/orders/${o.id}`)}
          />
        ) : (
          <>
            <InvoiceList
              invoices={filteredInvoices}
              selectedInvoices={selectedIds}
              toggleInvoiceSelection={toggleSelection}
              onSelect={inv => navigate(`/invoices/${inv.id}`)}
            />
            {filteredInvoices.length > 0 && (
              <button
                className={styles.exportButton}
                onClick={exportInvoices}
                disabled={exporting}
              >
                {exporting ? 'Exporting...' : 'Export Selected as PDF'}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
