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
        {coffees.map((coffee, i) => {
            return (
              <div className="card" key={i} >
                <h1>{coffee.name}</h1>
                <div className="coffee-data">
                  <div className="outer">
                    <img src={coffee.img_link} alt=""  data-aos="fade-up" data-aos-duration="1500"/>
                    <div className="outer-ing">
                      <h1>Ingredients</h1>
                      <ul>
                        <li>{coffee.ingredients.ing_1}</li>
                        <li>{coffee.ingredients.ing_2}</li>
                        {coffee.ingredients.ing_3 && (
                          <li>{coffee.ingredients.ing_3}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="inner">
                    <p>{coffee.description}</p>
                    <a href={coffee.vid_link}>
                      <button>Watch Recipe</button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BasicBrews;
