import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <blockquote>
        <p
          style={{
            fontFamily: "Forte",
            letterSpacing: "5px",
            color: "black",
          }}
        >
          Welcome to{" "}
          <strong
            style={{
              color: "brown",
            }}
          >
            Fools' Guide to Coffee
          </strong>
          , where we brew up joy and the perfect cup of
          <strong
            style={{
              color: "brown",
            }}
          >
            JAVA
          </strong>
          , too. Join us as we navigate the delightful chaos of the coffee world
          with a cup!
        </p>
      </blockquote>
      <div className="container">
        <h1>Get to know the bean basics...</h1>
        <div className="grid">
          <div data-aos="fade-up" data-aos-duration="1500">
            <h1>Arabica</h1>
            <div className="descp">
              <img
                src="https://www.collinsdictionary.com/images/full/arabicabean_95463061.jpg"
                alt=""
                data-aos="fade-down"
                data-aos-duration="1500"
              />
              <p>
                Despite containing less caffeine than Robusta, Arabica beans are
                often considered superior in taste. Arabica tends to have a
                smoother, sweeter taste, with flavour notes of chocolate and
                sugar. They often also have hints of fruits or berries.
              </p>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="1500">
            <h1>Robusta</h1>
            <div className="descp">
              <img
                src="https://espresso-works.com/cdn/shop/articles/espresso-works-blog-coffee-101-robusta-coffee-1_1081x.jpg?v=1681280369"
                alt=""
                data-aos="fade-down"
                data-aos-duration="1500"
              />
              <p>
                Despite its flavour being considered less refined, Robusta is
                widely used in espresso blends because it is known to produce a
                better crema i.e., the creamy layer found on top of an espresso
                shot, than Arabica. It is hardier, more resistant to disease and
                produces better yields. It also packs more caffeine.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="continue">
        <div>
          <p>
            Go through our selection of the basic brews of the perfect cups of
            coffee.
          </p>
        </div>
        <Link to="brews">
          <button>Coffee Collection</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
