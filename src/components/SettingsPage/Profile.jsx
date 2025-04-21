// src/components/Profile.jsx
import React from 'react';
import styles from '../../styles/Settings/Profile.module.css';

const Profile = ({userId}) => {
  const userDetails = {
    id: userId,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, City, Country"
  };

  return (
    <div className={styles.profileContainer}>
      <h2>Profile Details</h2>
      <p><strong>UserID:</strong> {userDetails.id}</p>
      <p><strong>Name:</strong> {userDetails.name}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Phone:</strong> {userDetails.phone}</p>
      <p><strong>Address:</strong> {userDetails.address}</p>
      <button className={styles.changeRequestBtn}>
        Request Changes
      </button>
    </div>
  );
};

export default Profile;
