import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login/Login.module.css';
import { ThemeContext } from '../contexts/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { theme, toggle } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchUserId = async () => {
      const response = await fetch('https://suims.vercel.app/api/customer/')
      const data = await response.json()
      const users = data.data;
      const userData = users[0]._id;
      localStorage.setItem('token', userData);
    }
    fetchUserId();
    navigate('/home');
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
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
        <h2 className={styles.heading}>Login</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles.loginButton}>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
