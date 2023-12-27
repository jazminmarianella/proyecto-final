import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../services/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

function ProductCreate() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 1,
    categoryId: 1,
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5Xs8ukkBwO2KxnpayyUoQCE6JZTDIfV93FuzVqAqQQ&s"],
  });
  const [categories, setCategories] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    // Obtener la lista de categorías desde la API
    api.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Verificar si el usuario es un administrador
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    console.log(id,value);
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, images: [value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      // Realizar la solicitud POST para crear el producto
      const response = await api.post('/products', formData);
      console.log('Producto creado:', response.data);

      e.target.reset();
      setIsSuccess(true);
      

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      // Redirigir o realizar otras acciones según tus necesidades
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };
  return (
    <div>
      <h2>Create Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" onChange={handleInputChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter description" onChange={handleInputChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control type="text" placeholder="Enter price" onChange={handleInputChange} />
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

        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control type="text" placeholder="Enter image URL" onChange={handleImageChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Product
        </Button>
      </Form>
      {isSuccess && <p style={{ color: 'green' }}>¡Producto creado con éxito!</p>}
    </div>
  );
}

export default ProductCreate;
