import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function handleRegister(e) {
    e.preventDefault();
    let res = await axios.post('http://localhost:8000/register', {
      email,
      password,
    });
    Swal.fire('Good job!', `${res.data.msg}`, 'success');
    navigate('/login');
  }
  return (
    <div className="sign-up">
      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header>
          <h1>Sign Up Form</h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleRegister}>
            <Form.Label htmlFor="inputEmail" className="mt-2">
              Email:
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="userEmail"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Label htmlFor="inputPassword" className="mt-2">
              Password:
            </Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-2">
              <Button type="submit">Sign up</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignUp;
