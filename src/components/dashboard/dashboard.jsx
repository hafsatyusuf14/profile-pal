import React, { useEffect, useState } from "react";
import UserCard from "../userCard/userCard";
import styles from "./dashboard.module.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersData = localStorage.getItem("users");
    if (usersData) {
      setUsers(JSON.parse(usersData));
    }
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <h2>User Dashboard</h2>
      <div className={styles.userCardsContainer}>
        {users.map((user, index) => (
          <div key={index} className={styles.userCardWrapper}>
            <UserCard
              firstname={user.firstName}
              lastname={user.lastName}
              email={user.email}
              dob={user.dob}
              image={user.image}
              mobile={user.mobileNumber}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
