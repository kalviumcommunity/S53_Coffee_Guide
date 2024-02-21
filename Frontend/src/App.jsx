import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import BasicBrews from "./components/routes/BasicBrews";
import { Routes, Route } from "react-router-dom";
import AddConcoction from "./components/routes/AddConcoction";
import HomePage from "./components/routes/HomePage";
import AOS from "aos";
import SignUp from "./components/routes/SignUp";
import body from "./assets/body.png"
import "aos/dist/aos.css";
import PostForm from "./components/routes/PostForm";
import UpdateForm from "./components/routes/UpdateForm";

function App() {
  AOS.init();
  return (
    <>
      <img src={body} alt="" className="beans" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brews" element={<BasicBrews />} />
        <Route path="/concoctions" element={<AddConcoction />} />
        <Route path="/post" element={<PostForm/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/update/:id" element={<UpdateForm />} />
      </Routes>
    </>
  );
}

export default App;
