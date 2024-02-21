import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [postData, setPostData] = useState({
    user_name: null,
    coffee_name: null,
    description: null,
    image_link: null,
    ingredients: {
      ing_1: null,
      ing_2: null,
      ing_3: null,
      ing_4: null,
      ing_5: null,
    },
    recipe: {
      step_1: null,
      step_2: null,
      step_3: null,
      step_4: null,
      step_5: null,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://s53-coffee-guide.onrender.com/api/crud/${id}`
        );
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      setPostData(data);
      const response = await axios.put(
        `https://s53-coffee-guide.onrender.com/api/crud/${id}`,
        postData
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

  useEffect(() => {
    console.log("postData: ", postData);
  });

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
              value={postData.user_name || ""}
              onChange={(e) =>
                setPostData({ ...postData, user_name: e.target.value })
              }
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
              value={postData.coffee_name || ""}
              onChange={(e) =>
                setPostData({ ...postData, coffee_name: e.target.value })
              }
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
              {...register("description")}
              value={postData.description || ""}
              onChange={(e) =>
                setPostData({ ...postData, description: e.target.value })
              }
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
              {...register("image_link")}
              value={postData.image_link || ""}
              onChange={(e) =>
                setPostData({ ...postData, image_link: e.target.value })
              }
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
                value={postData.ingredients[`ing_${index}`] || ""}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    ingredients: {
                      ...postData.ingredients,
                      [`ing_${index}`]: e.target.value,
                    },
                  })
                }
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
                value={postData.recipe[`step_${index}`] || ""}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    recipe: {
                      ...postData.recipe,
                      [`step_${index}`]: e.target.value,
                    },
                  })
                }
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
