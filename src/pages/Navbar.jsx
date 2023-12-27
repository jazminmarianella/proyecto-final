// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../services/AuthContext'; // Asegúrate de la ruta correcta
import { useCart } from '../services/CartContext';
import { FaShoppingCart } from 'react-icons/fa'; // Importa el ícono de carrito de Font Awesome

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { cart } = useCart();

    return (
        <BootstrapNavbar bg="light" expand="lg">
        <BootstrapNavbar.Brand as={Link} to="/">Tu E-Commerce</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            {isAuthenticated ? (
                <>
                <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                <Nav.Link as={Link} to="/products">Products</Nav.Link>
                <Nav.Link as={Link} to="/cart">
                    <FaShoppingCart size={20} />
                    {cart.length > 0 && <Badge bg="danger">{cart.length}</Badge>}
                </Nav.Link>
                <Button variant="outline-danger" onClick={logout}>Logout</Button>
                </>
            ) : (
                <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
            )}
            </Nav>
        </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
