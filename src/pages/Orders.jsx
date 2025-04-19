// src/pages/Orders.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import OrderList from '../components/OrdersPage/OrderList';
import OrderDetails from '../components/OrdersPage/OrderDetails';
import InvoiceList from '../components/OrdersPage/InvoiceList';
import InvoiceDetails from '../components/OrdersPage/InvoiceDetails';
import styles from '../styles/Orders/Orders.module.css';
import { jsPDF } from 'jspdf';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [exporting, setExporting] = useState(false);

  // Simulate fetch
  useEffect(() => {
    setOrders([
      { id: 1, orderNumber: 'ORD-001', items: ['Product A','Product B'], status: 'pending', total: 150.0 },
      { id: 2, orderNumber: 'ORD-002', items: ['Product C'], status: 'completed', total: 99.99 },
      { id: 3, orderNumber: 'ORD-003', items: ['Product D','Product E'], status: 'processing', total: 200.0 },
    ]);
    setInvoices([
      { id: 101, invoiceNumber: 'INV-001', orderDetails: 'Details for order ORD-001', total: 150.0 },
      { id: 102, invoiceNumber: 'INV-002', orderDetails: 'Details for order ORD-002', total: 99.99 },
    ]);
  }, []);

  const filteredOrders = orders.filter(o =>
    o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredInvoices = invoices.filter(i =>
    i.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOrderSelect = o => setSelectedOrder(o);
  const handleInvoiceSelect = i => setSelectedInvoice(i);
  const toggleInvoiceSelection = id =>
    setSelectedInvoices(prev =>
      prev.includes(id) ? prev.filter(x => x!==id) : [...prev, id]
    );

  const cancelOrder = id => {
    if (window.confirm('Cancel this order?')) {
      setOrders(prev =>
        prev.map(o => o.id===id ? { ...o, status:'cancelled' } : o)
      );
      setSelectedOrder(null);
    }
  };

  const exportInvoices = () => {
    if (selectedInvoices.length===0) {
      alert('Select at least one invoice.');
      return;
    }
    setExporting(true);
    const docs = new jsPDF();
    // ...same jsPDF logic as before...
    docs.save('invoices.pdf');
    setExporting(false);
    setSelectedInvoices([]);
  };

  return (
    <div className={styles.ordersPage}>
      <div className={styles.tabButtons}>
        <button
          className={activeTab==='orders'? styles.active : ''}
          onClick={()=> setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={activeTab==='invoices'? styles.active : ''}
          onClick={()=> setActiveTab('invoices')}
        >
          Invoices
        </button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className={styles.content}>
        {activeTab==='orders' ? (
          <>
            <div className={styles.listContainer}>
              <OrderList orders={filteredOrders} onSelect={handleOrderSelect} />
            </div>
            <div className={styles.detailsContainer}>
              {selectedOrder
                ? <OrderDetails order={selectedOrder} onCancel={cancelOrder} />
                : <p className={styles.placeholder}>Select an order to view details</p>
              }
            </div>
          </>
        ) : (
          <>
            <div className={styles.listContainer}>
              <InvoiceList
                invoices={filteredInvoices}
                selectedInvoices={selectedInvoices}
                toggleInvoiceSelection={toggleInvoiceSelection}
                onSelect={handleInvoiceSelect}
              />
            </div>
            <div className={styles.detailsContainer}>
              {selectedInvoice
                ? <InvoiceDetails invoice={selectedInvoice} onClose={()=>setSelectedInvoice(null)} />
                : <p className={styles.placeholder}>Click an invoice to view details</p>
              }
              {filteredInvoices.length>0 && (
                <button
                  className={styles.exportButton}
                  onClick={exportInvoices}
                  disabled={exporting}
                >
                  {exporting ? 'Exporting...' : 'Export Selected as PDF'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
