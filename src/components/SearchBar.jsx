// src/components/SearchBar.jsx
import React from 'react';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <input 
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={styles.searchInput}
    />
  );
};

export default SearchBar;
