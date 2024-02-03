import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./profileSetup.css";
import { ReactComponent as Logo } from "../logos/logo.svg";
import { ReactComponent as Upload } from "../logos/upload.svg";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setProfilePicture(file);
  };

  const saveUserData = (userData) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
  };

  return (
    <div className="profile">
      <div className="logo">
        <Logo />
      </div>

      <div className="center-container">
        <div className="profile-container">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              mobileNumber: "",
              dob: "",
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
              // Combine email with other form values and profile picture
              const userData = { ...values, email, profilePicture };
              console.log(userData);
              // Save user data to localStorage
              localStorage.setItem("userData", JSON.stringify(userData));
              saveUserData(userData);
              // Navigate to dashboard
              navigate("/dashboard");
            }}
          >
            {(formik) => (
              <Form style={{ width: "100%" }}>
                <div className="profile-picture-container">
                  <div className="profile-picture">
                    {profilePicture ? (
                      <label htmlFor="profilePicture" className="upload-label">
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
                      <label htmlFor="profilePicture" className="upload-label">
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
                  <div className="upload-container">
                    <span className="upload">Click to upload profile</span>
                  </div>
                </div>

                <div className="name-group">
                  <div className="profile-group">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="input"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="profile-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="input"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className="profile-group">
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <Field
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    className="input"
                  />
                  <ErrorMessage
                    name="mobileNumber"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="profile-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <Field type="date" id="dob" name="dob" className="input" />
                  <ErrorMessage name="dob" component="div" className="error" />
                </div>
                <div className="button-container">
                  <button
                    className="back-button"
                    type="button"
                    onClick={() => {
                      // Handle back button click here
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="create-account-button"
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
