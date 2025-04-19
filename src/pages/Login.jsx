import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import { ThemeContext } from '../contexts/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { theme, toggle } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic goes here.
    // On successful login, navigate to the home screen.
    localStorage.setItem('token', 'logged-in');
    navigate('/home');
  };

  return (
    <div className={styles.loginPage}>
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
      <form className={styles.loginForm} onSubmit={handleSubmit}>
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
