// src/pages/OrderDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderDetails from '../components/OrdersPage/OrderDetails';
import styles from '../styles/Orders/DetailPage.module.css';
import { orders } from '../../public/data';

export default function OrderDetailPage() {
    const { orderId } = useParams();
    const order = orders.find(o => o.id === Number(orderId));
    const navigate = useNavigate();




    if (!order) return <p>Loading…</p>;

    return (
        <div className={styles.page}>
            <button onClick={() => navigate(-1)} className={styles.back}>← Back</button>
            <OrderDetails order={order} />
        </div>
    );
}
