// src/pages/Settings.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Profile  from '../components/SettingsPage/Profile';
import Feedback from '../components/SettingsPage/Feedback';
import styles   from '../styles/Settings/Settings.module.css';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You have been logged out.');
    navigate('/login');
  };

  return (
    <div className={styles.accountContainer}>
      <aside className={styles.sidebar}>
        <button
          className={activeTab==='profile' ? styles.active : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={activeTab==='feedback' ? styles.active : ''}
          onClick={() => setActiveTab('feedback')}
        >
          Feedback
        </button>
        <button onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className={styles.content}>
        {activeTab === 'profile'  && <Profile />}
        {activeTab === 'feedback' && <Feedback />}
      </main>
    </div>
  );
}
