// src/layouts/MainLayout.jsx
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/MainLayout.module.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function MainLayout() {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <div className={styles.container}>
      <header className={styles.mobileHeader}>
        <div className={styles.brand}>YourBrandName</div>
        {/* Theme toggle (moves under sidebar on desktop) */}
        <div className={`${styles.themeToggle} ${theme === 'dark' ? styles.dark : ''}`}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggle}
            />
            <div className={styles.slider}>
              <div className={styles.icons}>
                <span className={styles.sun}>&#9728;</span>
                <span className={styles.moon}>&#9790;</span>
              </div>
            </div>
          </label>
        </div>
      </header>
      <Navbar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
