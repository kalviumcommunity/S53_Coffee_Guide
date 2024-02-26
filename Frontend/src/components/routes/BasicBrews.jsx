import React, { useEffect, useState } from "react";
import axios from "axios";

const BasicBrews = () => {
  const [coffees, setCoffee] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        //! change to render.com link
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/`);
        setCoffee(response.data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.log(err);
        setIsLoading(false); // Display an error message if fetching fails
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex-grid">
        <h1>Our Coffee Selections</h1>
        {isLoading ? (
          <div className="loading-container">
            <img
              src="https://i.pinimg.com/originals/b1/b8/fb/b1b8fbe29e6218d69b23b900d85b6595.gif"
              alt=""
            />
            <p>Loading coffees...</p>
          </div>
        ) : (
          <div className="grid-coffee">
            {coffees.map((coffee, i) => (
              <div className="card" key={i}>
                <h1>{coffee.name}</h1>
                <div className="coffee-data">
                  <div className="outer">
                    <img
                      src={coffee.img_link}
                      alt=""
                      data-aos="fade-up"
                      data-aos-duration="1500"
                    />
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicBrews;
