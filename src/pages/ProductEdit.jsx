import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import api from '../services/api';

function ProductEdit() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    images: [],
    category: '',
  });

  useEffect(() => {
    // Obtener datos del producto para prellenar el formulario
    api.get(`/products/${id}`)
      .then(response => setFormData(response.data))
      .catch(error => console.error('Error fetching product data:', error));

    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
    
          
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, images: [value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud PUT para actualizar el producto
      const response = await api.put(`/products/${id}`, formData);
      console.log('Producto actualizado:', response.data);

      // Redirigir o realizar otras acciones según tus necesidades
      navigate('/products');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <div>
      {isAdmin ? (
        <>
          <h2>Edit Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" value={formData.title} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" placeholder="Enter price" value={formData.price} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" value={formData.description} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="images">
              <Form.Label>Images</Form.Label>
              <Form.Control type="text" placeholder="Enter image URL" onChange={handleImageChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="categoryId">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" onChange={handleInputChange}>
                <option value="" disabled>Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.id} - {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </Form>
        </>
      ) : (
        <p>No tienes permisos para editar productos.</p>
      )}
    </div>
  );
}

export default ProductEdit;
