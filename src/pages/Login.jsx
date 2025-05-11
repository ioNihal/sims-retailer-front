
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login/Login.module.css';
import { ThemeContext } from '../contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function Login() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [step, setStep] = useState('enterEmail'); 
  const [email, setEmail] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [isActive, setIsActive] = useState(false);

  const [password, setPassword] = useState('');      
  const [newPassword, setNewPassword] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { theme, toggle } = useContext(ThemeContext);

  // Step 1: Check email
  const handleEmailSubmit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/customer/email/${encodeURIComponent(email)}`);
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
      const base64Password = btoa(newPassword);
      const res = await fetch(`${API_BASE}/api/customer/update/${customerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: base64Password })
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
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.message);
      localStorage.setItem('token', json.token);
      // convert seconds → ms
      const expiryMs = json.expiresIn * 1000;
      localStorage.setItem('tokenExpiry', expiryMs.toString());

      localStorage.setItem('user', JSON.stringify(json.user));
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <Toaster position='top-center' />
      <form
        className={styles.loginForm}
        onSubmit={
          step === 'enterEmail' ? handleEmailSubmit
            : step === 'setPassword' ? handleSetupSubmit
              : handleLoginSubmit
        }
      >
        <div className={`${styles.themeToggle} ${theme === 'dark' ? styles.dark : ''}`}>
          <label className={styles.switch}>
            <input type="checkbox" checked={theme === 'dark'} onChange={toggle} />
            <div className={styles.slider}>
              <div className={styles.icons}>
                <span className={styles.sun}>&#9728;</span>
                <span className={styles.moon}>&#9790;</span>
              </div>
            </div>
          </label>
        </div>

        <h2 className={styles.heading}>
          {step === 'enterEmail' && 'Enter Your Email'}
          {step === 'setPassword' && 'Set Your Password'}
          {step === 'login' && 'Sign In'}
        </h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading || step !== 'enterEmail'}
        />

        {step === 'enterEmail' && (
          <button className={styles.loginButton} disabled={loading}>
            {loading ? 'Checking…' : 'Next'}
          </button>
        )}

        {step === 'setPassword' && (
          <>
            <label>New Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={show ? 'text' : 'password'}
                placeholder="Choose a password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                disabled={loading}
              />
              <span className={styles.toggle}
                onClick={() => setShow(s => !s)}
                tabIndex={-1}
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <button className={styles.loginButton} disabled={loading || !newPassword}>
              {loading ? 'Saving…' : 'Save Password'}
            </button>
            <p className={styles.link} onClick={() => setStep('enterEmail')}>wrong email? Click here!</p>
          </>
        )}

        {step === 'login' && (
          <>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <input
                type={show ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <span className={styles.toggle}
                onClick={() => setShow(s => !s)}
                tabIndex={-1}
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
            <button className={styles.loginButton} disabled={loading || !password}>
              {loading ? 'Signing In…' : 'Sign In'}
            </button>
            <p className={styles.link} onClick={() => setStep('enterEmail')}>wrong email? Click here!</p>
          </>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div >
  );
}
