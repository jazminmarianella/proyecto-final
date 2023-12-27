import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [formData, setFormData] = useState({ email: '', password: '' });

  const updateFormInput = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleLogin =  (e) => {
  
  try {
    e.preventDefault(); // Evita la recarga de la página
    login(formData,navigate);
    // Redirects user after register
    navigate('/');
  } catch (error) {
    console.error('Error en la solicitud de registro:', error);
  }
}
  return (
    <div>
      <h2>Login</h2>
      <Form>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={updateFormInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={updateFormInput} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleLogin}>
        Log in
      </Button>
    </Form>
    </div>
  );
}

export default Login;