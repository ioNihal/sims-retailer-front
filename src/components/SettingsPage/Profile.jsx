import React, { useState } from 'react';
import styles from '../../styles/Settings/Profile.module.css';
import toast from 'react-hot-toast';
import { sendFeedback } from '../../api/feedback';

const Profile = ({ userId, user }) => {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const userDetails = {
    id: user?.id || "23746723",
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+91 737582383",
    address: user?.address || "123 Main St, City, Country"
  };

  const handleChangeReqClick = () => {
    setShowForm(true);
    setStatus(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setMessage('');
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      await sendFeedback(message);
      setStatus({ type: 'success', text: "Request send success!" });
      toast.success("Request sent successfully!")
      setMessage('');
      setShowForm(false);
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
      toast.error("Something went wrong!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2>Profile Details</h2>
      <p><strong>UserID:</strong> {userDetails.id}</p>
      <p><strong>Name:</strong> {userDetails.name}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Phone:</strong>+91 {userDetails.phone}</p>
      <p><strong>Address:</strong> {userDetails.address}</p>

      {!showForm ? (
        <button
          className={styles.changeRequestBtn}
          onClick={handleChangeReqClick}
        >
          Request Changes
        </button>
      ) : (
        <form className={styles.changeRequestForm} onSubmit={handleSubmit}>
          <label htmlFor="changeMessage">Describe your requested changes:</label>
          <textarea
            id="changeMessage"
            className={styles.formTextarea}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="E.g. Please update my address to …"
            required
          />
          <div className={styles.formButtons}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Sending…' : 'Send Request'}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      {status && (
        <p className={status.type === 'success' ? styles.successMsg : styles.errorMsg}>
          {status.text}
        </p>
      )}
    </div>
  );
};

export default Profile;
