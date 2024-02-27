import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const LogIn = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userName"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const formSubmitHandler = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_SERVER_URL}/login`,
        data
      );

      // Check if password is correct
      if (response.data.isPasswordValid) {
        setCookie("userName", response.data.user_name);
        setTimeout(() => {
          toast.success("Logged In Successfully!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }, 1000);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        // Display error message if password is incorrect
        toast.error("Incorrect password. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("passwordValid: ", response.data.isPasswordValid);
      }
    } catch (error) {
      console.error("Error logging in:", error);

      // Display error message
      toast.error("Error logging in. Please try again.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form-container">
      <div className="form">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          {/* Username */}
          <label className="form-label">
            Username
            <input
              type="text"
              {...register("user_name", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
              className="form-input"
            />
            {errors.user_name && (
              <p className="err">{errors.user_name.message}</p>
            )}
          </label>

          {/* Password */}
          <label className="form-label">
            Password
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="form-input"
            />
            {errors.password && (
              <p className="err">{errors.password.message}</p>
            )}
          </label>

          {/* Checkbox to show/hide password */}
          <label className="label-flex">
            <h2>Show Password</h2>
            <input type="checkbox" onClick={togglePasswordVisibility} />
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
      <ToastContainer />
    </div>
  );
};

export default LogIn;
