import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

function CategoryEdit() {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        image: ''
    });

    useEffect(() => {
        // Obtener datos del producto para prellenar el formulario
        api.get(`/categories/${id}`)
        .then(response => setFormData(response.data))
        .catch(error => console.error('Error fetching product data:', error));
        
    }, [id]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleImageChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, image: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
        // Realizar la solicitud PUT para actualizar el producto
        const response = await api.put(`/categories/${id}`, formData);
        console.log('Categoria actualizado:', response.data);


        // Redirigir o realizar otras acciones según tus necesidades
        navigate('/categories');
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        }
    };



return (
    <div>
        {isAdmin ? (
            <>
            <h2>Edit Category</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Category Name" value={formData.name} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="text" placeholder="Enter image URL" value={formData.image} onChange={handleImageChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                Update Category
                </Button>
            </Form>
            </>
        ) : (
            <p>No tienes permisos para editar categorias.</p>
        )}
        </div>
    );
}

export default CategoryEdit;