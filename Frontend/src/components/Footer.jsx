import React from "react";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-flex">
          <div
            className="title"
            style={{
              fontSize: "70px",
              fontWeight: "900",
            }}
          >
            Fools' Guide To Coffee
          </div>
          <div className="socials">
            <div>
              <a href="https://www.instagram.com/_f4zil_786?igsh=cjZ4aWh5ZXpoZXAz">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1024px-Instagram-Icon.png"
                  alt="instagram"
                />
              </a>
              <h2>Instagram</h2>
            </div>
            <div>
              <a href="https://www.linkedin.com/in/mohamed-fazil-985556289">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png"
                  alt="linkedin"
                />
              </a>
              <h2>LinkedIn</h2>
            </div>
          </div>
        </div>
        <h6>
          © 2024 Fools' Guide to Coffee. All rights reserved. Created by{" "}
          <u
            style={{
              color: "black",
            }}
          >
            Fazil
          </u>{" "}
          .
        </h6>
      </div>
    </>
  );
};

export default Footer;
