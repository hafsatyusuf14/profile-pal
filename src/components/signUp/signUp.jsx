import React from "react";
import SignupForm from "../signupForm/signupForm";
import "./signUp.css";
import { ReactComponent as Logo } from "../logos/logo.svg";

const SignUp = () => {
  return (
    <div className="signup">
      <div className="logo">
        <Logo />
      </div>
      <SignupForm />
    </div>
  );
};

export default SignUp;
