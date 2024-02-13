import React, { useEffect, useState } from "react";
import axios from "axios";

const BasicBrews = () => {
  const [coffees, setCoffee] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/crud/")
      .then((coffee) => setCoffee(coffee.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="flex-grid">
        <h1>Our Coffee Selections</h1>
        <div className="grid-coffee">
          <div className="card">
            <h1>Black Coffee</h1>
            <div className="coffee-data">
              <div className="outer">
                <img
                  src="https://www.allrecipes.com/thmb/MPt-QLff3yzJ4kgoO09PmyVAU50=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Latte-in-a-white-mug-3x2-1-3427b428cd5f4026842c5fafd1b01895.png"
                  alt=""
                />
                <div className="outer-ing">
                  <h1>Ingredients</h1>
                  <ul>
                    <li>Coffee Beans</li>
                    <li>Water</li>
                  </ul>
                </div>
              </div>
              <div className="inner">
                <p>
                  Black coffee is as simple as it gets with ground coffee beans
                  steeped in hot water, served warm.
                </p>
                <a href="">
                  <button>Watch Recipe</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicBrews;
