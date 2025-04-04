// src/pages/MainLayout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from '../styles/MainLayout.module.css';

const MainLayout = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
