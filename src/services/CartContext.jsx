import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Funciones para manejar el carrito, como agregar, quitar, actualizar cantidades, etc.

    useEffect(() => {

    }, [cart]);

    

    const removeFromCart = (productId) => {
        // Lógica para eliminar del carrito...
        setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
    };

    // Función para limpiar el carrito
    const clearCart = () => {
        setCart([]);
    };


    const value = {
    cart,
    removeFromCart,
    setCart,
    clearCart
    };


    return (
        <CartContext.Provider value={value}>
        {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
