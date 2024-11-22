import React, { useEffect, useState } from "react";
import "./Home.styles.css";
import Navbar from "./Navbar";
import { Link, useNavigate, Navigate } from "react-router-dom";
import AuthTabs from "./AuthTabs";
import Cookies from "js-cookie";

const Home = () => {
  const [showAuthTabs, setShowAuthTabs] = useState(false);
  const navigate = useNavigate()
  const token = Cookies.get('token')
  useEffect(()=>{
    if (token) {
      navigate('/dashboard')
    }
  })


  const handleGetStartedClick = () => {
    if(!token){
      Cookies.remove('token')
      setShowAuthTabs(true);

    }
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <Navbar />

      {/* Conditionally rendering AuthTabs based on state */}
      {showAuthTabs && <AuthTabs setShowAuthTabs={setShowAuthTabs} />}

      {/* Welcome Text */}
      <div className="home-page-content">
        <div className="wel-text">
          {/* Welcome Heading */}
          <h1 className="wel-heading">
            Easily Manage Your
            <span> Personal Notes</span>
          </h1>
          <div className="wel-quote">
            "You are never too old to set another goal or to dream a new dream."
          </div>
          <div className="responsive-img"></div>

          {/* Button to trigger AuthTabs display */}
          <Link className="sign-up-btn" to="#" onClick={handleGetStartedClick}>
            Get Started
          </Link>
        </div>

        {/* Home Page Img */}
        <div className="wel-page-img"></div>
      </div>
    </div>
  );
};

export default Home;
