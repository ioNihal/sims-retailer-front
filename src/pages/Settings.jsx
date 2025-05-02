// src/pages/Settings.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Profile from '../components/SettingsPage/Profile';
import Feedback from '../components/SettingsPage/Feedback';
import styles from '../styles/Settings/Settings.module.css';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    const raw = localStorage.getItem('user');
    const user = raw ? JSON.parse(raw) : null;
    setUser(user);
  }, [])

  const handleLogout = () => {
    if (!confirm('Sure you want to logout?')) return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    alert('You have been logged out!')
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
        <button onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className={styles.content}>
        {activeTab === 'profile' && <Profile userId={id} user={user} />}
        {activeTab === 'feedback' && <Feedback customerId={id} />}
      </main>
    </div>
  );
}
