import React from "react";
import styles from "./userCard.module.css";

const UserCard = ({ firstname, lastname, email, image, dob, mobile }) => {
  return (
    <div className={styles.userCard}>
      <div className={styles.avatarContainer}>
        <img
          src={
            image ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXa1i95KJZcS0jkf7n2zjI4h63PfjC8dDeiDc54fQDiw&s"
          }
          alt="Avatar Image"
          className={styles.avatar}
        />
      </div>
      <div className={styles.userInfo}>
        <h3 className={styles.userName}>
          {firstname} {lastname}
        </h3>
        <p className={styles.userEmail}>{email}</p>
        <p className={styles.userEmail}>{dob}</p>
        <p className={styles.userEmail}>{mobile}</p>
      </div>
    </div>
  );
};

export default UserCard;
