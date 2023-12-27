import React, { useEffect, useState }  from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../services/AuthContext';
function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryId = new URLSearchParams(location.search).get('category');   
  const [products, setProducts] = useState([]);
  const { user, isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);


  useEffect(() => {
    // Llamada a la API para obtener la lista de products (filtrado por categoria si existe)
    
    const endpoint = categoryId ? `/products?categoryId=${categoryId}` : '/products';
    console.log('endpoint', endpoint);
    api.get(endpoint)
      .then(response => setProducts(response.data))
      .catch(error => console.log('Error fetching products:', error));
  }, [categoryId])

  const handleNewProduct = (e) =>{
    navigate('/products/create');
  }

  const handleEditProduct = (productId) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleViewProduct = (productId) => {
    navigate(`/products/${productId}`)
  }

  const handleShowModal = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  const handleDeleteProduct = async () => {
    if (selectedProductId) {
      try {
        // Realizar la solicitud DELETE para eliminar el producto
        await api.delete(`/products/${selectedProductId}`);
        // Actualizar la lista de productos después de la eliminación
        const updatedProducts = products.filter(product => product.id !== selectedProductId);
        setProducts(updatedProducts);
        // Cerrar el modal
        handleCloseModal();
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };
 
  return (
    <div>
      <div>
        <h2>Productos</h2>
        {user && user.role === 'admin' && (
              <p><Button onClick={handleNewProduct}>+</Button></p>
            )}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px', textAlign: 'center' }}>
            {/* Aquí verificamos si el rol del usuario es "admin" para mostrar el botón de "Edit" */}
            {/* Asegúrate de que user esté definido antes de intentar acceder a user.role */}
            {user && isAdmin && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => handleEditProduct(product.id)} style={{ marginRight: 'auto' }}>
                <FaPencilAlt />
                </Button>
                <Button variant='danger' onClick={() => handleShowModal(product.id)}>
                <MdOutlineCancel />
                </Button>
              </div>
            )}

            <img src={product.images[0]} alt={product.title} style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '10px' }} />
            <h3 onClick={() => handleViewProduct(product.id)}>{product.title}</h3>
            <Button variant='link' onClick={() => handleViewProduct(product.id)}>Ver Detalle</Button>
            <p><strong>${product.price}</strong></p>
            <Badge bg="info">{product.category.name}</Badge>
          </div>
        ))}
      </div>

      {/* Modal de confirmación para eliminar productos */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar este producto?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Products;