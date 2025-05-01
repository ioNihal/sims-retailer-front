// src/pages/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login/Login.module.css';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Login() {
  const [step, setStep] = useState('enterEmail'); // enterEmail | setPassword | login
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [isActive, setIsActive] = useState(false);

  const [password, setPassword] = useState('');       // for login
  const [newPassword, setNewPassword] = useState(''); // for setup
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { theme, toggle } = useContext(ThemeContext);

  // Step 1: Check email
  const handleEmailSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch(`https://suims.vercel.app/api/customer/email/${encodeURIComponent(email)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message);
      setCustomerId(json.customer._id);
      setIsActive(json.customer.isActive);
      setStep(json.customer.isActive ? 'login' : 'setPassword');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Set password for inactive
  const handleSetupSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch(`https://suims.vercel.app/api/customer/update/${customerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message);
      setPassword(newPassword);
      setStep('login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Login
  const handleLoginSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch(`https://suims.vercel.app/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message);
      localStorage.setItem('token', json.token);
      localStorage.setItem('user', json.user?.id);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <form
        className={styles.loginForm}
        onSubmit={
          step === 'enterEmail' ? handleEmailSubmit
          : step === 'setPassword' ? handleSetupSubmit
          : handleLoginSubmit
        }
      >
        <div className={`${styles.themeToggle} ${theme==='dark'?styles.dark:''}`}>
          <label className={styles.switch}>
            <input type="checkbox" checked={theme==='dark'} onChange={toggle}/>
            <div className={styles.slider}>
              <div className={styles.icons}>
                <span className={styles.sun}>&#9728;</span>
                <span className={styles.moon}>&#9790;</span>
              </div>
            </div>
          </label>
        </div>

        <h2 className={styles.heading}>
          {step==='enterEmail' && 'Enter Your Email'}
          {step==='setPassword' && 'Set Your Password'}
          {step==='login' && 'Sign In'}
        </h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading || step!=='enterEmail'}
        />

        {step === 'enterEmail' && (
          <button className={styles.loginButton} disabled={loading}>
            {loading ? 'Checking…' : 'Next'}
          </button>
        )}

        {step === 'setPassword' && (
          <>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Choose a password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button className={styles.loginButton} disabled={loading || !newPassword}>
              {loading ? 'Saving…' : 'Save Password'}
            </button>
          </>
        )}

        {step === 'login' && (
          <>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              disabled={loading}
            />
            <button className={styles.loginButton} disabled={loading || !password}>
              {loading ? 'Signing In…' : 'Sign In'}
            </button>
          </>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
