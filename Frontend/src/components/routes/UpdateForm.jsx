import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const UpdateForm = () => {
  const [cookies, setCookie] = useCookies(["userToken", "userName"]);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      user_name: "",
      coffee_name: "",
      description: "",
      image_link: "",
      ingredients: {
        ing_1: "",
        ing_2: "",
        ing_3: "",
        ing_4: "",
        ing_5: "",
      },
      recipe: {
        step_1: "",
        step_2: "",
        step_3: "",
        step_4: "",
        step_5: "",
      },
    },
  });

  useEffect(() => {
    if (cookies.userToken == "undefined") {
      alert("Please Log In to Update the Post");
      navigate("/login");
    }
  }, [cookies.userToken, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/${id}`
        );
        // Set default values for the form fields
        Object.entries(response.data).forEach(([key, value]) => {
          if (key === "ingredients" || key === "recipe") {
            Object.entries(value).forEach(([subKey, subValue]) => {
              setValue(`${key}.${subKey}`, subValue);
            });
          } else {
            setValue(key, value);
          }
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/${id}`,
        data
      );
      toast.success("Post Updated", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/concoctions");
      }, 2000);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleButtonClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <div className="form">
        <h1>Update the Post</h1>
        <form>
          {/* User Name */}
          <label>
            User Name
            <input
              className="form-input"
              type="text"
              {...register("user_name")}
            />
          </label>
          {errors.user_name && (
            <p className="err">{errors.user_name.message}</p>
          )}
          {/* Coffee Name */}
          <label>
            Coffee Name
            <input
              className="form-input"
              type="text"
              {...register("coffee_name")}
            />
          </label>
          {errors.coffee_name && (
            <p className="err">{errors.coffee_name.message}</p>
          )}
          {/* Description */}
          <label>
            Description
            <textarea className="form-input" {...register("description")} />
          </label>
          {errors.description && (
            <p className="err">{errors.description.message}</p>
          )}
          {/* Image Link */}
          <label>
            Image Link{" "}
            <strong
              style={{
                fontWeight: "900",
                color: "brown",
              }}
            >
              (use{" "}
              <a
                href="https://imgbb.com/"
                style={{
                  color: "black",
                }}
              >
                imgBB.com
              </a>{" "}
              to convert and paste as <u>direct link</u>)
            </strong>
            <input
              type="text"
              className="form-input"
              {...register("image_link")}
            />
          </label>
          {errors.image_link && (
            <p className="err">{errors.image_link.message}</p>
          )}
          {/* Ingredients */}
          <label>
            Ingredients
            {[1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                className="form-input"
                type="text"
                {...register(`ingredients.ing_${index}`)}
                placeholder={`Ingredient ${index}`}
              />
            ))}
          </label>
          {/* Recipe Steps */}
          <label>
            Recipe Steps
            {[1, 2, 3, 4, 5].map((index) => (
              <textarea
                key={index}
                className="form-input"
                {...register(`recipe.step_${index}`)}
                placeholder={`Step ${index}`}
              />
            ))}
          </label>
          <div className="button-flex">
            {/* Normal button triggering form submission */}
            <button
              type="button"
              onClick={handleButtonClick}
              className="signup-btn"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;
