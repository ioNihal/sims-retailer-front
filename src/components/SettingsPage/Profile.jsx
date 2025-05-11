import React, { useState } from 'react';
import styles from '../../styles/Settings/Profile.module.css';
import toast from 'react-hot-toast';
import { sendFeedback } from '../../api/feedback';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { resetPassword } from '../../api/user';

const Profile = ({ userId, user }) => {
  const [activeForm, setActiveForm] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [show, setShow] = useState(false);

  const userDetails = {
    id: user?.id || "23746723",
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+91 737582383",
    address: user?.address || "123 Main St, City, Country"
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
  
    try {
      setIsResetting(true);
      await resetPassword(newPassword, confirmPassword);
      toast.success('Password reset successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setActiveForm(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsResetting(false);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      await sendFeedback(message);
      setStatus({ type: 'success', text: "Request sent successfully!" });
      toast.success("Request sent successfully!");
      setMessage('');
      setActiveForm(null);
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setActiveForm(null);
    setMessage('');
    setNewPassword('');
    setConfirmPassword('');
    setStatus(null);
  };

  return (
    <div className={styles.profileContainer}>
      <h2>Profile Details</h2>
      <p><strong>UserID:</strong> {userDetails.id}</p>
      <p><strong>Name:</strong> {userDetails.name}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Phone:</strong>+91 {userDetails.phone}</p>
      <p><strong>Address:</strong> {userDetails.address}</p>

      <div className={styles.section}>
        {(activeForm === 'reset' || activeForm === 'request') && (
          <form
            className={styles.changeRequestForm}
            onSubmit={activeForm === 'reset' ? handlePasswordReset : handleSubmit}
          >
            {activeForm === 'reset' ? (
              <>
                <label htmlFor="newPassword">New Password:</label>
                <div className={styles.inputWrapper}>
                  <input
                    type={show ? 'text' : 'password'}
                    id="newPassword"
                    className={styles.formInput}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <span className={styles.toggle}
                    onClick={() => setShow(s => !s)}
                    tabIndex={-1}
                    aria-label={show ? 'Hide password' : 'Show password'}
                  >
                    {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <div className={styles.inputWrapper}>
                  <input
                    type={show ? 'text' : 'password'}
                    id="confirmPassword"
                    className={styles.formInput}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span className={styles.toggle}
                    onClick={() => setShow(s => !s)}
                    tabIndex={-1}
                    aria-label={show ? 'Hide password' : 'Show password'}
                  >
                    {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </span>
                </div>
              </>
            ) : (
              <>
                <label htmlFor="changeMessage">Describe your requested changes:</label>
                <textarea
                  id="changeMessage"
                  className={styles.formTextarea}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="E.g. Please update my address to …"
                  required
                />
              </>
            )}
            <div className={styles.formButtons}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={activeForm === 'reset' ? isResetting : loading}
              >
                {activeForm === 'reset' ? (isResetting ? 'Resetting...' : 'Reset Password') : (loading ? 'Sending…' : 'Send Request')}
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCancel}
                disabled={activeForm === 'reset' ? isResetting : loading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Buttons shown only when no form is active */}
        {activeForm === null && (
          <div className={styles.buttonRow}>
            <button
              className={styles.changeRequestBtn}
              onClick={() => setActiveForm('reset')}
            >
              Reset Password
            </button>
            <button
              className={styles.changeRequestBtn}
              onClick={() => setActiveForm('request')}
            >
              Request Changes
            </button>
          </div>
        )}
      </div>


      {status && (
        <p className={status.type === 'success' ? styles.successMsg : styles.errorMsg}>
          {status.text}
        </p>
      )}
    </div>
  );
};

export default Profile;
