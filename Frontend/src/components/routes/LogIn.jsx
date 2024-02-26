import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // State for storing form data
  const [formData, setFormData] = useState(null);

  // Watch the value of the "password" field
  const passwordValue = watch("password");

  // State for controlling the visibility of the password
  const [showPassword, setShowPassword] = useState(false);

  // Toggle function for showing/hiding password
  const passwordShow = () => {
    setShowPassword(!showPassword);
  };

  // Form submit handler
  const formSubmitHandler = (data) => {
    toast.success("Registration Complete", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // Set form data in the state
    setFormData(data);
  };

  // Function to prevent copy-paste events
  const preventCopyPaste = (e) => {
    e.preventDefault();
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <div className="form">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {/* Username input */}
          <label>
            Username
            <input
              className="form-input"
              type="text"
              name="username"
              autoComplete="none"
              {...register("username", {
                required: "Please enter a Username",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+$/,
                  message: "Only letters, numbers, (_) , (.), and (-) allowed",
                },
                minLength: {
                  value: 3,
                  message: "Minimum 2 characters required",
                },
              })}
            />
          </label>
          {<p className="err">{errors.username?.message}</p>}
          {/* Password input */}
          <label>
            Password
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              name="password"
              {...register("password", {
                required: "Please enter Password",
                minLength: {
                  value: 10,
                  message: "Minimum 8 characters required",
                },
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Password should contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                },
              })}
              onPaste={preventCopyPaste}
              onCopy={preventCopyPaste}
            />
          </label>
          {<p className="err">{errors.password?.message}</p>}

          {/* Checkbox to show/hide password */}
          <label className="label-flex">
            <h2>Show Password</h2>
            <input type="checkbox" onClick={passwordShow} />
          </label>

          {/* Submit button */}
          <div className="button-flex">
            <input type="submit" value="Log In" className="signup-btn" />
          </div>
          <Link to="/signup" className="account">
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
