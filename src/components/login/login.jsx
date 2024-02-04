// import React, { useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import "./signupForm.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const [submitted, setSubmitted] = useState(false);
//   const [loginError, setLoginError] = useState("");

//   const handleLogin = (values) => {
//     const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//     const user = existingUsers.find((user) => user.email === values.email);

//     if (user && user.password === values.password) {
//       navigate("/dashboard");
//     } else {
//       setLoginError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="form-container">
//       <Formik
//         initialValues={{
//           email: "",
//           password: "",
//         }}
//         validationSchema={Yup.object({
//           email: Yup.string()
//             .email("Invalid email address")
//             .required("Email is required"),
//           password: Yup.string().required("Password is required"),
//         })}
//         onSubmit={(values, { setSubmitting }) => {
//           handleLogin(values);
//           setSubmitting(false);
//         }}
//       >
//         {(formik) => (
//           <Form>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <Field type="text" id="email" name="email" className="input" />
//               <ErrorMessage
//                 name="email"
//                 component="div"
//                 className={`error ${
//                   submitted && formik.touched.email && formik.errors.email
//                     ? "show"
//                     : ""
//                 }`}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <Field
//                 type="password"
//                 id="password"
//                 name="password"
//                 className="input"
//               />
//               <ErrorMessage
//                 name="password"
//                 component="div"
//                 className={`error ${
//                   submitted && formik.touched.password && formik.errors.password
//                     ? "show"
//                     : ""
//                 }`}
//               />
//             </div>

//             {loginError && <div className="error">{loginError}</div>}

//             <button
//               className="submit-button"
//               type="submit"
//               disabled={!formik.isValid || !formik.dirty}
//               onClick={() => {
//                 setSubmitted(true);
//                 setLoginError("");
//               }}
//             >
//               Login
//             </button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default LoginForm;
