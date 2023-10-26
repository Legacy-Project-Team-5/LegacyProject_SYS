import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import"./signup.css"

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  async function handleRegister(e) {
    e.preventDefault();
    let res = await axios.post("http://localhost:8000/register",{email,password})
    Swal.fire(
      'Good job!',
      `${res.data.msg}`,
      'success'
    )
    navigate("/login")
  }
  return (
    <div className="form">
      <h1>Sign Up Form</h1>
      <form className="loginForm" onSubmit={handleRegister}>
        <label htmlFor="userEmail">Email</label>
        <input
          id="userEmail"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignUp;
