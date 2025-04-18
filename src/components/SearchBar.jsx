// src/components/SearchBar.jsx
import React from 'react';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={e => onChange(e.target.value)}
      className={styles.searchInput}
    />
  );
}
