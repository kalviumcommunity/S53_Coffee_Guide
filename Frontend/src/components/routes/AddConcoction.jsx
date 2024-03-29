import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const AddConcoction = () => {
  const [cookies, setCookie] = useCookies(["userToken", "userName"]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/posts`
        );
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id, userName) => {
    try {
      if (userName !== cookies.userName) {
        alert("You are not allowed to delete this post.");
        return;
      }
      const deletePost = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/${id}`
      );
      toast.success("Post Deleted", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error("Error deleting posts:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseUser = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/get/users`
        );
        setUsers(responseUser.data);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  const filteredPosts = selectedUser
    ? posts.filter((post) => post.user_name === selectedUser)
    : posts;

  return (
    <>
      <div className="intro-container">
        <ToastContainer />
        <h1>PostTe</h1>
        <p>
          Indulge your passion for coffee and share your flavorful concoctions
          with our vibrant community. On this platform, you'll find a welcoming
          space where coffee lovers gather to exchange ideas, recipes, and
          experiences.
        </p>
      </div>
      <div className="add-flex">
        <h2>Add Your Coffee Creation</h2>
        <Link
          to="/post"
          style={{
            textDecoration: "none",
          }}
        >
          <button className="add">+</button>
        </Link>
      </div>
      <div className="filter-users">
        <select value={selectedUser} onChange={handleUserChange}>
          <option value="">Select a user</option>
          {users.map((user, index) => (
            <option key={index} value={user.user_name}>
              {user.user_name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grid-post">
        {isLoading ? (
          <div className="loading-container">
            <img
              src="https://i.pinimg.com/originals/b1/b8/fb/b1b8fbe29e6218d69b23b900d85b6595.gif"
              alt=""
            />
            <p>Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="loading-container p">
            No posts from - <u>{selectedUser}</u>
          </p>
        ) : (
          <div className="grid-coffee-post">
            {filteredPosts.map((post, index) => (
              <div className="card-post" key={index}>
                <h1>{post.coffee_name}</h1>
                <img src={post.image_link} alt="" />
                <h2>
                  ~ <strong>{post.user_name}</strong>
                </h2>
                <button
                  onClick={() => openModal(post)}
                  className="modal-button"
                >
                  View Details
                </button>
                {cookies.userToken && cookies.userName === post.user_name && (
                  <div className="update-delete">
                    <Link
                      to={`/update/${post._id}`}
                      style={{
                        textDecoration: "none",
                      }}
                    >
                      <button>Update</button>
                    </Link>
                    <button
                      onClick={(e) => handleDelete(post._id, post.user_name)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedPost && (
        <div className={`modal ${modalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h1>{selectedPost.coffee_name}</h1>
            <h2>By {selectedPost.user_name}</h2>
            <div className="modal-flex">
              <div className="modal-flex-1">
                <img src={selectedPost.image_link} alt="" />
                {selectedPost.ingredients && (
                  <>
                    <h3>Ingredients</h3>
                    <ul>
                      {Object.entries(selectedPost.ingredients)
                        .filter(([key]) => key !== "_id") // Exclude the _id property
                        .filter(([key, ingredient]) => ingredient) // Filter out empty ingredients
                        .map(([key, ingredient], index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                  </>
                )}
              </div>
              <div className="modal-flex-2">
                <p>{selectedPost.description}</p>
                {selectedPost.recipe && (
                  <>
                    <h3>Recipe</h3>
                    <ol>
                      {Object.entries(selectedPost.recipe)
                        .filter(([key]) => key !== "_id") // Exclude the _id property
                        .filter(([key, step]) => step) // Filter out empty recipe steps
                        .map(([key, step], index) => (
                          <li key={index}>{step}</li>
                        ))}
                    </ol>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddConcoction;
