import React from "react";
import LOGO from "./../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="main-div">
      <div className="border">
        <div className="flex-box">
          <div className="flex1">
            <Link to="/" className="link">
              <div
                style={{
                  fontSize: "50px",
                }}
              >
                Fools' Guide To Coffee
              </div>
            </Link>
          </div>
          <div className="flex2">
            <Link to="/" className="link1">
              <p>Home</p>
            </Link>
            <Link to="/brews" className="link1">
              <p>Basic Brews</p>
            </Link>
            <Link to="/concoctions" className="link1">
              <p>PostTe</p>
            </Link>
            <Link to="/post" className="link1">
              <p>JavaCraft</p>
            </Link>
            <Link to="/signup" className="link1">
              <p>Sign Up/Log In</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
