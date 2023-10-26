import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Swal from 'sweetalert2';
import "./login.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  let decoded;
  let token;

  async function handleLogin(e) {
    try {
      e.preventDefault();
      let res = await axios.post("http://localhost:8000/login", { email, password });
      if (res.status === 200) {
        Swal.fire(
          'Yes!',
          `${res.data.msg}`,
          'success'
        )
        localStorage.setItem("token", res.data.token);
        navigate("/")
      }
    } catch (error) {
      Swal.fire(
        "Cannot log in", 
        "please check your email or password",
        "warning");
    }
  }

  return (
    <div className="login">
      <h1>Login Form</h1>
      <form className="loginForm" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

export default Login;
