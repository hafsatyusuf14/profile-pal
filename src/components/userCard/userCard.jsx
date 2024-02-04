import React from "react";
import styles from "./userCard.module.css";

const UserCard = ({
  firstname,
  lastname,
  email,
  image,
  dob,
  mobile,
  showEditButton,
  onButtonClick,
}) => {
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
        <p className={styles.userEmail}>
          {" "}
          <strong>Email: </strong>
          {email}
        </p>
        <p className={styles.userEmail}>
          <strong>DOB: </strong>
          {dob}
        </p>
        <p className={styles.userEmail}>
          <strong>Mobile:</strong> {mobile}
        </p>
      </div>
      <div className={styles.buttonContainer}>
        {" "}
        {/* Add a container for the button */}
        {showEditButton && (
          <button onClick={onButtonClick} className={styles.editButton}>
            Edit profile
          </button>
        )}
        {!showEditButton && <div className={styles.buttonPlaceholder} />}{" "}
        {/* Add a placeholder for the button */}
      </div>
    </div>
  );
};

export default UserCard;
