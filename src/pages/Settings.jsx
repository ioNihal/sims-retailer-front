
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Profile from '../components/SettingsPage/Profile';
import Feedback from '../components/SettingsPage/Feedback';
import styles from '../styles/Settings/Settings.module.css';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [user, setUser] = useState({});

  const [showConfirm, setShowConfirm] = useState(false);
   const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('user');
    const user = raw ? JSON.parse(raw) : null;
    setUser(user);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('You have been logged out!')
  };

  return (
    <div className={styles.settingsContainer}>
      <aside className={styles.sidebar}>
        <button
          className={activeTab === 'profile' ? styles.active : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={activeTab === 'feedback' ? styles.active : ''}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
         <button onClick={() => setShowTerms(true)} className={styles.termsBtn}>
          Terms & Policy
        </button>
        <button onClick={() => setShowConfirm(true)}>
          Logout
        </button>
        {showConfirm && (
          <ConfirmDialog
            message="Sure you want to logout?"
            onConfirm={() => {
              setShowConfirm(false);
              handleLogout();
            }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </aside>

      <main className={styles.content}>
        {activeTab === 'profile' && <Profile userId={id} user={user} />}
        {activeTab === 'feedback' && <Feedback customerId={id} />}
      </main>
      {showTerms && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Terms & Policy</h2>
            <button
              className={styles.closeModal}
              onClick={() => setShowTerms(false)}
            >
              Close
            </button>
            <div className={styles.modalBody}>
              <ul>
                <li>
                  <strong>Invoice Payment:</strong> All invoices must be paid in full on or before the due date stated on the invoice. Late payments may incur interest charges or access restrictions.
                </li>
                <li>
                  <strong>No Spam Orders:</strong> Customers shall place orders only for legitimate inventory needs. Repeated test or spam orders may result in suspension of ordering privileges.
                </li>
                <li>
                  <strong>Accurate Information:</strong> You agree to provide and maintain accurate, complete, and up-to-date billing and contact information in your account.
                </li>
                <li>
                  <strong>Account Security:</strong> You are responsible for safeguarding your login credentials. Notify us immediately of any unauthorized use of your account.
                </li>
                <li>
                  <strong>Service Availability:</strong> We strive for 99.9% uptime but may occasionally perform maintenance. We will provide advance notice whenever possible.
                </li>
                <li>
                  <strong>Prohibited Uses:</strong> You may not use the portal for unlawful purposes, including fraudulent orders or distribution of malware.
                </li>
                <li>
                  <strong>Modifications:</strong> We reserve the right to update these Terms & Policy at any time. Continued use of the portal constitutes acceptance of any changes.
                </li>
                <li>
                  <strong>Support:</strong> For questions or disputes regarding these terms, contact our support team at support@example.com.
                </li>
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
