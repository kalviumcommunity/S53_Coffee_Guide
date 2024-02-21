import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [postData, setPostData] = useState(null);

  const onSubmit = async (data) => {
    console.log("data: ", data);
    try {
      //! change to render.com link
      const response = await axios.post(
        "https://s53-coffee-guide.onrender.com/api/crud/",
        data
      );
      toast.success("Coffee Posted", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("response: ", data);
      setPostData(response.data);
      setTimeout(() => {
        navigate("/concoctions");
      }, 2000);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    console.log("postData: ", postData);
  }, [postData]);

  const handleButtonClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <div className="form">
        <h1>Create a Coffee Post</h1>
        <form>
          {/* User Name */}
          <label>
            User Name
            <input
              className="form-input"
              type="text"
              {...register("user_name", {
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
          {errors.user_name && (
            <p className="err">{errors.user_name.message}</p>
          )}
          {/* Coffee Name */}
          <label>
            Coffee Name
            <input
              className="form-input"
              type="text"
              {...register("coffee_name", {
                required: "Please add name to your coffee",
                minLength: { value: 3, message: "Minimum 2 char required" },
              })}
            />
          </label>
          {errors.coffee_name && (
            <p className="err">{errors.coffee_name.message}</p>
          )}

          {/* Description */}
          <label>
            Description
            <textarea
              className="form-input"
              {...register("description", {
                required: "Please add some description",
              })}
            />
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
              {...register("image_link", { required: "Please add image URL" })}
            />
          </label>
          {errors.image_link && (
            <p className="err">{errors.image_link.message}</p>
          )}

          {/* Ingredients */}
          <label>
            Ingredients
            <input
              className="form-input"
              type="text"
              {...register("ingredients.ing_1")}
              placeholder="Ingredient 1"
            />
            <input
              className="form-input"
              type="text"
              {...register("ingredients.ing_2")}
              placeholder="Ingredient 2"
            />
            <input
              className="form-input"
              type="text"
              {...register("ingredients.ing_3")}
              placeholder="Ingredient 3"
            />
            <input
              className="form-input"
              type="text"
              {...register("ingredients.ing_4")}
              placeholder="Ingredient 4"
            />
            <input
              className="form-input"
              type="text"
              {...register("ingredients.ing_5")}
              placeholder="Ingredient 5"
            />
          </label>

          {/* Recipe Steps */}
          <label>
            Recipe Steps
            <textarea
              className="form-input"
              {...register("recipe.step_1")}
              placeholder="Step 1"
            />
            <textarea
              className="form-input"
              {...register("recipe.step_2")}
              placeholder="Step 2"
            />
            <textarea
              className="form-input"
              {...register("recipe.step_3")}
              placeholder="Step 3"
            />
            <textarea
              className="form-input"
              {...register("recipe.step_4")}
              placeholder="Step 4"
            />
            <textarea
              className="form-input"
              {...register("recipe.step_5")}
              placeholder="Step 5"
            />
          </label>

          <div className="button-flex">
            {/* Normal button triggering form submission */}
            <button
              type="button"
              onClick={handleButtonClick}
              className="signup-btn"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
