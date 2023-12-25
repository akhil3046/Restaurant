import './Home.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css"; // Create a separate CSS file for Home component styles

function Home() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const URL = 'https://server-y2dt.onrender.com/'
  const handleButton = () => {
    navigate("/restaraunt");
  };

  const handleCard = (restaraunt) => {
    navigate('/Form', {state: {restaurant: restaraunt}})
  }

  useEffect(() => {
    axios.get(URL+"/all").then((res) => setRestaurants(res.data));
  }, []);

  return (
    <div className="home-container">
      <div className="background-gradient"></div>
      <div className="content">
        <div className="header">
          <h1><b>Customisable Feedback Form</b></h1>
          <p>add your restaurants below..</p>
        </div>
        <div className="restaurant-list">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="restaurant-card" onClick={() => handleCard(restaurant)}>
              <h2 className="restaurant-name">{restaurant.name}</h2>
            </div>
          ))}
        </div>
        <button onClick={handleButton} className="add-button">
          Add New 
        </button>
      </div>
    </div>
  );
}

export default Home;
