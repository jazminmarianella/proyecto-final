import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import api from '../services/api';
import { useAuth } from '../services/AuthContext';

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  
  useEffect(() => {
    // Llamada a la API para obtener las categorías
    api.get('/categories')
      .then(response => setCategories(response.data)) //Respuesta OK
      .catch(error => console.error('Error fetching categories:', error)); //Respuesta Falla
  }, []); // El array de dependencias está vacío, lo que significa que el efecto se ejecutará solo una vez al montar el componente

  const handleNewCategory = (e) => {
    navigate('/category/create');
  }

  const handleEditCategory = (categoryId) => {
    navigate(`/category/edit/${categoryId}`);
  }

  const handleShowModal = (productId) => {
    setSelectedCategoryId(productId);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategoryId(null);
  };

  const handleDeleteCategory = async () => {
    if (selectedCategoryId) {
      try {
        // Realizar la solicitud DELETE para eliminar la categoria
        // Solo puede hacer DELETE si la categoria no contiene productos
        await api.delete(`/categories/${selectedCategoryId}`);
        // Actualizar la lista de productos después de la eliminación
        const updatedCategories = categories.filter(category => category.id !== selectedCategoryId);
        setCategories(updatedCategories);
        // Cerrar el modal
        handleCloseModal();
      } catch (error) {
        console.error('Error al eliminar la categoria:', error);
      }
    }
  };



  return (
    <div>
      <div>
        <h2>Categories</h2>
        {user && user.role === 'admin' && (
              <p><Button onClick={handleNewCategory}>+</Button></p>
            )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map(category => (
          <div key={category.id} style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '20px' }}>
            {user && isAdmin && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={() => handleEditCategory(category.id)} style={{ marginRight: 'auto' }}>
                <FaPencilAlt />
                </Button>
                <Button variant='danger' onClick={() => handleShowModal(category.id)}>
                <MdOutlineCancel />
                </Button>
              </div>
            )}
            <Link to={`/products?category=${category.id}`}>
              <h3>{category.name}</h3>
            </Link>
            <img src={category.image} alt={category.name} style={{ maxWidth: '100%', maxHeight: '150px', marginTop: '10px' }} />
          </div>
        ))}
      </div>

      {/* Modal de confirmación para eliminar categorias */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar esta categoria?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDeleteCategory}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Categories;

