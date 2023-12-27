import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../services/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

function CategoryCreate() {
    const [formData, setFormData] = useState({
        name: '',
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5Xs8ukkBwO2KxnpayyUoQCE6JZTDIfV93FuzVqAqQQ&s"
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const { isAdmin } = useAuth();

    // Verificar si el usuario es un administrador 
    if (!isAdmin) {
    return <Navigate to='/' />;
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        console.log(id,value);
        setFormData({ ...formData, [id]: value});
    };

    const handleImageChange = (e) => {
        const { value } = e.target;
        setFormData({...formData, image: value});
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            // Realizar solicitud POST para crear la categoria
            const response = await api.post('/categories',formData);
            console.log('Categoria creada', response.data);

            e.target.reset();
            setIsSuccess(true);

            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <div>
            <h2>Create Category</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Category name" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="Enter image URL" onChange={handleImageChange} />
                </Form.Group>
        
                <Button variant="primary" type="submit">
                Create Category
                </Button>
            </Form>
            {isSuccess && <p style={{ color: 'green' }}>¡Categoria creado con éxito!</p>}
            </div>
        );
}

export default CategoryCreate;