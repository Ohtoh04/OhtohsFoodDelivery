import React from "react";
import { Link } from "react-router";  // Import the Link component
import {useAuth} from "../../context/AuthorizationContext.jsx";
import "../style.css"; // Ensure the path aligns with your project setup

const Header = () => {

  const { user, logout } = useAuth();
  
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">DeliveryApp</h1>

        <nav className="header-nav">
          <ul className="header-menu-center">
            <li><Link to="/dishes/add">Create</Link></li>  
            <li><Link to="/dishes">Read</Link></li>        
          </ul>
        </nav>

        <nav className="header-nav">
          <ul className="header-menu">
            <li><Link to="/">Home</Link></li>              
            {user ? (
              <>
                <li><button onClick={logout} className="logout-button">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>        
                <li><Link to="/register">Register</Link></li>   
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
