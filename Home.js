
import React from "react";
import "./Home.css"; // Ensure you have your CSS for Home

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="welcome-message">Welcome to the Notes App</h1>
      <p className="description">
        Here you can create, edit, and manage your notes efficiently.
      </p>
    </div>
  );
};

export default Home;
