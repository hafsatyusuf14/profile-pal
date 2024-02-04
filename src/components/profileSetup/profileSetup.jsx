// Import the necessary modules
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styles from "./profileSetup.module.css";
import { ReactComponent as Logo } from "../logos/logo.svg";
import { ReactComponent as Upload } from "../logos/upload.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setProfilePicture(file);
  };

  // Function to save user data and display success message
  const saveUserData = (userData) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const profilePictureURL = userData.profilePicture
      ? URL.createObjectURL(userData.profilePicture)
      : null;
    const newUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      mobileNumber: userData.mobileNumber,
      dob: userData.dob,
      profilePicture: profilePictureURL,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Show a success toast message for 5 seconds
    toast.success("Signup successful!");
    setTimeout(() => {
      // Clear the success toast after 5 seconds
      toast.dismiss();
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className={styles.profile}>
      <ToastContainer /> {/* Toast container for displaying alerts */}
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles["center-container"]}>
        <div className={styles["profile-container"]}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              mobileNumber: "",
              dob: "",
              profilePicture: "",
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
              const email = localStorage.getItem("email");
              const userData = { ...values, email, profilePicture };
              saveUserData(userData);
            }}
          >
            {(formik) => (
              <Form style={{ width: "100%" }}>
                <div className={styles["profile-picture-container"]}>
                  <div className={styles["profile-picture"]}>
                    {profilePicture ? (
                      <label
                        htmlFor="profilePicture"
                        className={styles["upload-label"]}
                      >
                        <img
                          src={URL.createObjectURL(profilePicture)}
                          alt="Profile"
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                          }}
                        />
                      </label>
                    ) : (
                      <label
                        htmlFor="profilePicture"
                        className={styles["upload-label"]}
                      >
                        <Upload height={100} width={100} />{" "}
                      </label>
                    )}
                    <input
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className={styles["upload-container"]}>
                    <span className={styles.upload}>
                      Click to upload profile photo
                    </span>
                  </div>
                </div>

                <div className={styles["name-group"]}>
                  <div className={styles["profile-group"]}>
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

                  <div className={styles["profile-group"]}>
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

                <div className={styles["profile-group"]}>
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

                <div className={styles["profile-group"]}>
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
                <div className={styles["button-container"]}>
                  <button
                    className={styles["save-button"]}
                    type="submit"
                    disabled={!formik.isValid || !formik.dirty}
                  >
                    Create Account
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

export default ProfileSetup;
