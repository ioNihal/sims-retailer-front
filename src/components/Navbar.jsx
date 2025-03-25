import { NavLink } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/home" className={({ isActive }) => isActive ? styles.active : ''}>
        Home
      </NavLink>
      <NavLink to="/orders" className={({ isActive }) => isActive ? styles.active : ''}>
        Orders
      </NavLink>
      <NavLink to="/account" className={({ isActive }) => isActive ? styles.active : ''}>
        Account
      </NavLink>
    </nav>
  );
};

export default Navbar;
