import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Categories from './pages/Categories';
import CategoryCreate from './pages/CategoryCreate';
import CategoryEdit from './pages/CategoryEdit';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './pages/ProductEdit';
import ProductDetail from './pages/ProductDetail';
import CartView from './pages/CartView';
import Navbar from './pages/Navbar';
import PurchaseSuccess from './pages/PurchaseSuccess';
import { useNavigate } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext'; 
import { CartProvider } from './services/CartContext';
import './App.css'


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Verificar si el usuario está autenticado (por ejemplo, al cargar la aplicación)
    const storedUser = localStorage.getItem('user');
    setIsAuthenticated(!!storedUser);
  }, []);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    setIsAuthenticated(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/login');
    // ... Otras acciones necesarias al cerrar sesión
  };

  return (
    <CartProvider>
      <AuthProvider>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} className='mr-auto mb-2 mb-lg-0'/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} /> 
          <Route path="/register" element={<Register/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/products/:id" element={<ProductDetail/>} />
          <Route path="/products/create" element={<ProductCreate/>} />
          <Route path="/products/edit/:id" element={<ProductEdit/>} />
          <Route path="/categories" element={<Categories/>} />
          <Route path="/category/create" element={<CategoryCreate/>} />
          <Route path="/category/edit/:id" element={<CategoryEdit/>} />
          <Route path="/cart" element={<CartView/>} />
          <Route path="/purchase-success" element={<PurchaseSuccess/>} />
        </Routes>
      </AuthProvider>
    </CartProvider>
  )
}

export default App


