import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { useCart } from '../services/CartContext';
import api from '../services/api';

function ProductDetails() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }


  // Función para agregar un producto al carrito
const addToCart = () => {
  console.log('Agregar al carrito!');
  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    // Si el producto ya está en el carrito, actualiza la cantidad
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  } else {
    // Si el producto no está en el carrito, agrégalo con una cantidad inicial de 1
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  }
};

  return (
    <div style={{ display: 'flex' }}>
      {/* Imagen a la izquierda */}
      <img src={product.images[0]} alt={product.title} style={{ maxWidth: '300px', maxHeight: '300px', marginRight: '20px' }} />

      {/* Detalles a la derecha */}
      <div>
        <h2>{product.title}</h2>
        <Badge bg="primary" style={{ fontSize: '1.1em' }}>${product.price}</Badge>
        <p>Description: {product.description}</p>
        <p>Category: {product.category.name}</p>
        <Button variant="dark" onClick={addToCart}>Agregar al Carrito</Button>
      </div>
    </div>
  );
}

export default ProductDetails;
