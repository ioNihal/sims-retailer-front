// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Navbar() {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
        <NavLink to="/orders" className={({ isActive }) => isActive ? styles.active : ''}>Orders</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? styles.active : ''}>Settings</NavLink>
      </div>
    </nav>
  );
}
