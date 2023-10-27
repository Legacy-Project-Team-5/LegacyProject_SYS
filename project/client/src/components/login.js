import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  let decoded;
  let token;

  async function handleLogin(e) {
    try {
      e.preventDefault();
      let res = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
        Swal.fire('Yes!', `${res.data.msg}`, 'success');
      }
    } catch (error) {
      Swal.fire(
        'Cannot log in',
        'please check your email or password',
        'warning',
      );
    }
  }

  return (
    <div className="login">
      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header>
          <h1>Login Form</h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Label htmlFor="inputEmail" className="mt-2">
              Email:
            </Form.Label>
            <Form.Control
              id="email"
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Label htmlFor="inputPassword" className="mt-2">
              Password:
            </Form.Label>
            <Form.Control
              id="pass"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-2">
              <Button type="submit">Login</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
