// src/pages/Account.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import Feedback from '../components/Feedback';
import styles from '../styles/Account.module.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Your logout logic here (e.g., clear tokens, etc.)
    alert("You have been logged out.");
    navigate('/'); // Navigate back to login page (or any appropriate route)
  };

  return (
    <div className={styles.accountContainer}>
      <div className={styles.tabButtons}>
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
        <button onClick={handleLogout}>Logout</button>
      </div>
      <section className={styles.content}>
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'feedback' && <Feedback />}
      </section>
    </div>
  );
};

export default Account;
