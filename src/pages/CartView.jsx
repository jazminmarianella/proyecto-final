import React from 'react';
import { useCart } from '../services/CartContext';
import { Button } from 'react-bootstrap';
import { FaRegFaceSadCry } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const CartView = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Función para calcular el subtotal de un producto
  const calculateSubtotal = (product) => {
    return product.quantity * product.price;
  };

  // Función para calcular el precio total del carrito
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + calculateSubtotal(product), 0);
  };


  const handleCheckout = () => {
    // Realizar acciones de finalización de la compra
    // Redirigir a la página de compra exitosa
    navigate('/purchase-success');

    // Limpiar el carrito después de una compra exitosa
    clearCart();
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <div>
          <FaRegFaceSadCry style={{ fontSize: '8.1em' }} />
        <h5>Tu carrito está vacío!</h5>
        </div>
        
      ) : (
        <div>
          {cart.map((product) => (
            <div key={product.id} style={{ borderBottom: '1px solid #ddd', marginBottom: '10px', paddingBottom: '10px' }}>
              <h3>{product.title}</h3>
              <img src={product.image} alt={product.title} tyle={{ maxWidth: '300px', maxHeight: '300px', marginRight: '20px' }} />
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Subtotal: ${calculateSubtotal(product)}</p>
              <Button variant="danger" onClick={() => removeFromCart(product.id)}>
                Remove from Cart
              </Button>
            </div>
          ))}
          <div style={{ marginTop: '20px' }}>
            <h4>Total Price: ${calculateTotalPrice()}</h4>
            <Button variant="primary" onClick={handleCheckout}>Finalizar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
