// src/components/Feedback.jsx
import React, { useState } from 'react';
import styles from '../styles/Feedback.module.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback!");
    setFeedback("");
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
        <button type="submit" className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};

export default Feedback;
