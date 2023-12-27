import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../services/api';
function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' , avatar: 'https://picsum.photos/800', role: 'customer'});


  const updateFormInput = (e) => {
    const newValue = e.target.type === 'checkbox' ? (e.target.checked ? 'admin' : 'customer') : e.target.value;
    setFormData({ ...formData, [e.target.id]: newValue });
    console.log(formData);
  };

  const handleRegister = async (e) => {
  e.preventDefault(); // Evita la recarga de la página
  try {
    const response = await api.post('/users', formData);
    console.log('Registro exitoso:', response.data);
    // Redirects user after register
    navigate('/');
  } catch (error) {
    console.error('Error en la solicitud de registro:', error);
  }
};





  return (
    <div>
      <h2>Register</h2>
      <Form>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={updateFormInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={updateFormInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={updateFormInput} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="role">
          <Form.Check
            type="switch"
            label="Admin"
            name="role"
            value="admin"
            onChange={updateFormInput}
          />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleRegister}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default Register;