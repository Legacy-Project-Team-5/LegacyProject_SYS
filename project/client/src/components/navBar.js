import React from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

import "./navBar.css";
// import App from "../App"

function NavBar() {
  const navigate = useNavigate();
  let token;
  let decoded;
  try {
    token = localStorage.getItem("token");

    if (token) {
      decoded = jwt_decode(token);
    }
    console.log("Token:", token);
  console.log("Decoded:", decoded);
  } catch (error) {
    console.log("Invalid token", error);
  }

  function handleLogout() {
    if (token) {
      localStorage.removeItem("token");
      navigate("/login");
      window.location.reload();
    } else {
      return;
    }
  }

  return (
    <>
      {!token ? (
        <nav className="navContainer">
          <div>
            <h1>SYS</h1>
          </div>
          <div>
            {/* <Link to="/form">Post an ad</Link> */}
            <Link className="links" to="signup">Sign up</Link>
            <Link className="links" to="login">Log in</Link>
            <Link className="links" to="/">Ads</Link>
          </div>
        </nav>
      ) : (
        <nav className="navContainer">
          <div>
            <h1>SYS</h1>
          </div>
          <div>
            <Link className="links" >{decoded.email}</Link>
            <Link className="links" to="/form">Post an ad</Link>
            <Link className="links" onClick={handleLogout}>Log out</Link>
            <Link className="links" to="/">Ads</Link>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
