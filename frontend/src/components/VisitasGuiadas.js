import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';
import { useAuth } from '../context/AuthContext';

function VisitasGuiadas() {
  const { isAdmin } = useAuth();
  const [visitas, setVisitas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newVisita, setNewVisita] = useState({
    titulo: '',
    descripcion: '',
    duracion: '',
    max_personas: '',
    recorrido: '',
    horarios: '',
    precio: ''
  });

  useEffect(() => {
    loadVisitas();
  }, []);

  const loadVisitas = async () => {
    try {
      const response = await axiosInstance.get('/visitas');
      setVisitas(response.data);
    } catch (error) {
      console.error('Error al cargar visitas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir el precio a número antes de enviarlo
      const visitaData = {
        ...newVisita,
        precio: parseFloat(newVisita.precio),
        duracion: parseInt(newVisita.duracion),
        max_personas: parseInt(newVisita.max_personas)
      };

      await axiosInstance.post('/visitas', visitaData);
      loadVisitas();
      setShowForm(false);
      setNewVisita({
        titulo: '',
        descripcion: '',
        duracion: '',
        max_personas: '',
        recorrido: '',
        horarios: '',
        precio: ''
      });
    } catch (error) {
      console.error('Error al crear visita:', error);
      alert('Error al crear la visita guiada');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta visita guiada?')) {
      try {
        await axiosInstance.delete(`/visitas/${id}`);
        loadVisitas();
      } catch (error) {
        console.error('Error al eliminar visita:', error);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Visitas Guiadas</h2>
        {isAdmin() && !showForm && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            Nueva Visita Guiada
          </button>
        )}
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h4>Nueva Visita Guiada</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Título:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newVisita.titulo}
                  onChange={(e) => setNewVisita({...newVisita, titulo: e.target.value})}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción:</label>
                <textarea
                  className="form-control"
                  value={newVisita.descripcion}
                  onChange={(e) => setNewVisita({...newVisita, descripcion: e.target.value})}
                  rows="3"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Duración (minutos):</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newVisita.duracion}
                    onChange={(e) => setNewVisita({...newVisita, duracion: e.target.value})}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Máximo de personas:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newVisita.max_personas}
                    onChange={(e) => setNewVisita({...newVisita, max_personas: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Recorrido:</label>
                <textarea
                  className="form-control"
                  value={newVisita.recorrido}
                  onChange={(e) => setNewVisita({...newVisita, recorrido: e.target.value})}
                  rows="2"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Horarios disponibles:</label>
                <textarea
                  className="form-control"
                  value={newVisita.horarios}
                  onChange={(e) => setNewVisita({...newVisita, horarios: e.target.value})}
                  placeholder="Ej: Lunes a Viernes: 10:00, 14:00, 16:00&#10;Sábados y Domingos: 11:00, 15:00"
                  rows="3"
                  required
                />
                <small className="text-muted">
                  Ingresa los horarios separados por líneas para mejor organización
                </small>
              </div>

              <div className="mb-3">
                <label className="form-label">Precio:</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    className="form-control"
                    value={newVisita.precio}
                    onChange={(e) => setNewVisita({...newVisita, precio: e.target.value})}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary me-2">
                Guardar Visita
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {visitas.map(visita => (
          <div key={visita.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{visita.titulo}</h5>
                <p className="card-text">{visita.descripcion}</p>
                
                <div className="mt-3">
                  <h6 className="border-bottom pb-2">Detalles de la Visita</h6>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-clock me-2"></i>
                      <strong>Duración:</strong> {visita.duracion} minutos
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-people me-2"></i>
                      <strong>Capacidad máxima:</strong> {visita.max_personas} personas
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-cash me-2"></i>
                      <strong>Precio:</strong> {formatPrice(visita.precio)}
                    </li>
                  </ul>

                  <div className="mt-3">
                    <h6 className="mb-2"><strong>Horarios Disponibles:</strong></h6>
                    <div className="bg-light p-2 rounded">
                      {visita.horarios.split('\n').map((horario, index) => (
                        <p key={index} className="mb-1">{horario}</p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3">
                    <h6 className="mb-2"><strong>Recorrido:</strong></h6>
                    <p className="mb-0">{visita.recorrido}</p>
                  </div>
                </div>

                {isAdmin() && (
                  <div className="mt-3 border-top pt-3">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(visita.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisitasGuiadas; 