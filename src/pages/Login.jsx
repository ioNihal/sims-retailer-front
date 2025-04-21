import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login/Login.module.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Login() {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [loading, setLoading]     = useState(false);
  const navigate                  = useNavigate();
  const { theme, toggle }         = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://suims.vercel.app/api/customer/');
      if (!response.ok) {
        throw new Error(`Server responded ${response.status}`);
      }
      const data     = await response.json();
      const users    = data.data;
      const userId   = users[0]?._id;
      if (!userId) {
        throw new Error('No user found');
      }
      localStorage.setItem('token', userId);
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type="submit"
          className={styles.loginButton}
          disabled={loading}
        >
          {loading ? 'Signing In…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
