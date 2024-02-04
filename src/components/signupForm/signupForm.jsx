import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./signupForm.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const isEmailTaken = (email, existingUsers) => {
    return existingUsers.some((user) => user.email === email);
  };

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
          if (isEmailTaken(values.email, existingUsers)) {
            setSubmitting(false);
            setEmailError("Email is already in use");
          } else {
            localStorage.setItem("email", values.email); // Store email in localStorage
            navigate("/profileSetup");
          }
        }}
      >
        {(formik) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" className="input" />
              <ErrorMessage
                name="email"
                component="div"
                className={`error ${
                  submitted && formik.touched.email && formik.errors.email
                    ? "show"
                    : ""
                }`}
              />
              {emailError && <div className="error">{emailError}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="input"
              />
              <ErrorMessage
                name="password"
                component="div"
                className={`error ${
                  submitted && formik.touched.password && formik.errors.password
                    ? "show"
                    : ""
                }`}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="input"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className={`error ${
                  submitted &&
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "show"
                    : ""
                }`}
              />
            </div>

            <button
              className="submit-button"
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              onClick={() => {
                setSubmitted(true);
                setEmailError("");
              }}
            >
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
