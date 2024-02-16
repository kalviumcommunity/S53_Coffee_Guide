import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
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

    // Store form data in local storage
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", data.password);

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
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {/* Name input */}
          <label>
            Name
            <input
              className="form-input"
              type="text"
              name="firstName"
              autoComplete="none"
              {...register("firstName", {
                required: "Please enter First Name",
                minLength: { value: 3, message: "Minimum 2 char required" },
              })}
            />
          </label>
          {<p className="err">{errors.firstName?.message}</p>}

          {/* Username input */}
          <label>
            Create Username
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

          {/* Email input */}
          <label>
            Email Address
            <input
              className="form-input"
              type="text"
              name="email"
              autoComplete="none"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter valid email",
                },
              })}
            />
          </label>
          {<p className="err">{errors.email?.message}</p>}

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

          {/* Retype Password input */}
          <label>
            Retype Password
            <input
              className="form-input"
              type={showPassword ? "text" : "password"}
              name="retypePassword"
              {...register("retypePassword", {
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
              onPaste={preventCopyPaste}
              onCopy={preventCopyPaste}
            />
          </label>
          {<p className="err">{errors.retypePassword?.message}</p>}

          {/* Checkbox to show/hide password */}
          <label className="label-flex">
            <h2>Show Password</h2>
            <input type="checkbox" onClick={passwordShow} />
          </label>

          {/* Submit button */}
          <div className="button-flex">
            <input type="submit" value="Sign Up" className="signup-btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
