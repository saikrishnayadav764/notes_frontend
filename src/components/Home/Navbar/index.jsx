import React, { useState } from "react";
import "./Navbar.styles.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Register from "../Register";
import Login from "../Login";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false); 
  const [isLogin, setIsLogin] = useState(false); 
  return (
    <nav>
      {/* logo */}
      <Link className="nav-list-item" to="/">
      <div className="logo">
        todo<span>List</span>
      </div>
      </Link>
      <div
        className="hamburger"
        onClick={() => {
          setNavOpen(!navOpen);
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      {/* Dialogue box Nav List */}
      {navOpen && (
        <div
          className="nav-box"
          onClick={() => {
            setNavOpen(!navOpen);
          }}
        >
          <div className="nav-list-box">
            <Link className="nav-list-item-ham" to="/">
              Home
            </Link>
            {/* <Link className="nav-list-item-ham" to="/dashboard">
              Dashboard
            </Link> */}
            <Link className="nav-list-item-ham" to="/about">
              About
            </Link>
          </div>
        </div>
      )}

      {/* Static List */}
      <div className="nav-list">
        <Link className="nav-list-item" to="/">
          Home
        </Link>
        {/* <Link className="nav-list-item" to="/dashboard">
          Dashboard
        </Link> */}
        <Link className="nav-list-item" to="/about">
          About
        </Link>
      </div>

      <div className="auth-btn">
        <div onClick={() => setIsRegister(true)} className="sign-up">Sign Up</div>
        <div onClick={() => setIsLogin(true)} className="sign-in">Sign In</div>
      </div>
      {isRegister ? <Register  setIsRegister={setIsRegister}/> : null}
      {isLogin ? <Login setIsLogin={setIsLogin} /> : null}

    </nav>
  );
};

export default Navbar;
