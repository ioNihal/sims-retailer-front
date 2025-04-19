// src/pages/InvoiceDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InvoiceDetails from '../components/OrdersPage/InvoiceDetails';
import styles from '../styles/Orders/DetailPage.module.css';
import { invoices } from '../../public/data';

export default function InvoiceDetailPage() {
    const { invoiceId } = useParams();
    const invoice = invoices.find(i => i.id === Number(invoiceId));
    const navigate = useNavigate();



    if (!invoice) return <p>Loading…</p>;

    return (
        <div className={styles.page}>
            <button onClick={() => navigate(-1)} className={styles.back}>← Back</button>
            <InvoiceDetails invoice={invoice} />
        </div>
    );
}
