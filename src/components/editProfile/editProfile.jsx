import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./editProfile.module.css";
import UserContext from "../userContext";

const EditProfile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const { users, setUsers } = useContext(UserContext);

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("users"));
    if (usersData) {
      const currentUser = usersData[usersData.length - 1]; // Get the current user
      setCurrentUser(currentUser);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setProfilePicture(file);
  };

  const saveUpdatedUserData = (updatedUserData) => {
    // Retrieve users data from localStorage
    let usersData = JSON.parse(localStorage.getItem("users")) || [];

    // Find the index of the current user in the array
    const currentUserIndex = usersData.findIndex(
      (user) => user.id === updatedUserData.id
    );

    if (currentUserIndex !== -1) {
      // Replace the current user with the updated user
      usersData[currentUserIndex] = updatedUserData;

      // Update localStorage with the modified user data
      localStorage.setItem("users", JSON.stringify(usersData));

      // Update the users state in context
      setUsers(usersData);

      // Navigate to the dashboard
      navigate("/dashboard");
    } else {
      console.error("Current user not found in users data");
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profile}>
      <h2 className={styles.header}>Edit Profile</h2>
      <div className={styles.centerContainer}>
        <div className={styles.profileContainer}>
          <Formik
            initialValues={{
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              mobileNumber: currentUser.mobileNumber,
              dob: currentUser.dob,
            }}
            validationSchema={Yup.object({
              firstName: Yup.string().required("First Name is required"),
              lastName: Yup.string().required("Last Name is required"),
              mobileNumber: Yup.string()
                .matches(/^\d+$/, "Mobile Number must contain only digits")
                .required("Mobile Number is required"),
              dob: Yup.date().required("Date of Birth is required"),
            })}
            onSubmit={(values) => {
              const updatedUserData = {
                ...currentUser,
                ...values,
                profilePicture: profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : currentUser.profilePicture,
              };
              saveUpdatedUserData(updatedUserData);
            }}
          >
            {(formik) => (
              <Form className={styles.form}>
                <div className={styles.nameGroup}>
                  <div className={styles.profileGroup}>
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className={styles.input}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.profileGroup}>
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className={styles.input}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className={styles.error}
                    />
                  </div>
                </div>

                <div className={styles.profileGroup}>
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <Field
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.profileGroup}>
                  <label htmlFor="dob">Date of Birth</label>
                  <Field
                    type="date"
                    id="dob"
                    name="dob"
                    className={styles.input}
                  />
                  <ErrorMessage
                    name="dob"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={`${styles.saveButton} ${
                      formik.isValid && formik.dirty ? "" : styles.disabled
                    }`}
                    type="submit"
                    disabled={!formik.isValid || !formik.dirty}
                  >
                    Save Changes
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
