import React from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import styles from '../styles/RefreshButton.module.css';

export default function RefreshButton({ onClick, loading = false }) {
  return (
    <button
      className={styles.refreshButton}
      onClick={onClick}
      disabled={loading}
      aria-label="Refresh"
    >
      <FiRefreshCcw className={loading ? styles.spin : ''} />
    </button>
  );
}
