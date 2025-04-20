// src/data/mockData.js
export const orders = [
    { id: 1, orderNumber: 'ORD-001', items: ['Product A','Product B'], status: 'pending', total: 150.0 },
    { id: 2, orderNumber: 'ORD-002', items: ['Product C'],          status: 'completed', total:  99.99 },
    { id: 3, orderNumber: 'ORD-003', items: ['Product D','Product E'], status: 'processing', total: 200.0 },
    { id: 4, orderNumber: 'ORD-001', items: ['Product A','Product B'], status: 'pending', total: 150.0 },
    { id: 5, orderNumber: 'ORD-002', items: ['Product C'],          status: 'completed', total:  99.99 },
    { id: 6, orderNumber: 'ORD-003', items: ['Product D','Product E'], status: 'processing', total: 200.0 },
  ];
  
  export const invoices = [
    { id: 101, invoiceNumber: 'INV-001', orderDetails: 'Details for ORD-001', total: 150.0 },
    { id: 102, invoiceNumber: 'INV-002', orderDetails: 'Details for ORD-002', total:  99.99 },
    { id: 103, invoiceNumber: 'INV-001', orderDetails: 'Details for ORD-001', total: 150.0 },
    { id: 104, invoiceNumber: 'INV-002', orderDetails: 'Details for ORD-002', total:  99.99 },
    { id: 105, invoiceNumber: 'INV-001', orderDetails: 'Details for ORD-001', total: 150.0 },
    { id: 106, invoiceNumber: 'INV-002', orderDetails: 'Details for ORD-002', total:  99.99 },
    { id: 107, invoiceNumber: 'INV-001', orderDetails: 'Details for ORD-001', total: 150.0 },
    { id: 108, invoiceNumber: 'INV-002', orderDetails: 'Details for ORD-002', total:  99.99 },
  ];
  