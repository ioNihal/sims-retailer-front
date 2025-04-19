import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import Profile from '../components/Profile';
import Feedback from '../components/Feedback';
import styles from '../styles/Account.module.css';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { theme, toggle } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('You have been logged out.');
    navigate('/');
  };

  return (
    <div className={styles.accountContainer}>

      {/* Tabs / Sidebar */}
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
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Theme toggle (moves under sidebar on desktop) */}
      <div className={styles.themeToggle}>
        <label>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggle}
          />
          Dark Mode
        </label>
      </div>

      {/* Content */}
      <section className={styles.content}>
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'feedback' && <Feedback />}
      </section>
    </div>
  );
};

export default Account;
