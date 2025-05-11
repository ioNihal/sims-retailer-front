
import React, { useState } from 'react';
import styles from '../../styles/Settings/Feedback.module.css';
import { sendFeedback } from '../../api/feedback';
import toast from 'react-hot-toast';

const Feedback = ({ customerId }) => {
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await sendFeedback(feedback);

      setStatus({ type: 'success', message: "Feedback sent successfully!" });
      toast.success("Feedback sent successfully!")
      setLoading(false);
      setFeedback('');
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message
      });
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className={styles.feedbackContainer}>
      <h2>Feedback / Report</h2>
      <form onSubmit={handleSubmit} className={styles.feedbackForm}>
        <textarea
          placeholder="Enter your feedback or report any issues here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className={styles.textarea}
          required
        ></textarea>
        <button type="submit" className={styles.submitBtn}>{loading ? 'Sending...' : 'Send'}</button>
        {status && (
          <p className={status.type === 'success' ? styles.successMsg : styles.errorMsg}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Feedback;
