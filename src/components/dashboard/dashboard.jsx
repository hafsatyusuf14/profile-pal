import React, { useEffect, useState } from "react";
import UserCard from "../userCard/userCard";
import styles from "./dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../userContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { users, setUsers } = useUser();

  useEffect(() => {
    const usersData = localStorage.getItem("users");
    if (usersData) {
      const parsedUsers = JSON.parse(usersData);
      const currentUser = parsedUsers[parsedUsers.length - 1];
      currentUser.showEditButton = true;
      const updatedUsers = [currentUser, ...parsedUsers.slice(0, -1)];
      setUsers(updatedUsers);
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <h2>User Profiles</h2>
      <div className={styles.userCardsContainer}>
        {users.map((user, index) => (
          <div key={index} className={styles.userCardWrapper}>
            {/* Add a check to ensure user object exists */}
            {user && (
              <UserCard
                firstname={user.firstName}
                lastname={user.lastName}
                email={user.email}
                dob={user.dob}
                image={user.profilePicture}
                mobile={user.mobileNumber}
                showEditButton={user.showEditButton}
                onButtonClick={() => navigate("/editProfile")}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
