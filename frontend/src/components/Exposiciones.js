import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';
import { useAuth } from '../context/AuthContext';

function Exposiciones() {
  const { isAdmin } = useAuth();
  const [exposiciones, setExposiciones] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newExposicion, setNewExposicion] = useState({
    titulo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado: 'proxima',
    imagen: null
  });

  useEffect(() => {
    loadExposiciones();
  }, []);

  const loadExposiciones = async () => {
    try {
      const response = await axiosInstance.get('/exposiciones');
      setExposiciones(response.data);
    } catch (error) {
      console.error('Error al cargar exposiciones:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(newExposicion).forEach(key => {
      formData.append(key, newExposicion[key]);
    });

    try {
      await axiosInstance.post('/exposiciones', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      loadExposiciones();
      setShowForm(false);
      setNewExposicion({
        titulo: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        estado: 'proxima',
        imagen: null
      });
    } catch (error) {
      console.error('Error al crear exposición:', error);
      alert('Error al crear la exposición');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta exposición?')) {
      try {
        await axiosInstance.delete(`/exposiciones/${id}`);
        loadExposiciones();
      } catch (error) {
        console.error('Error al eliminar exposición:', error);
      }
    }
  };

  const getStatusBadgeClass = (estado) => {
    switch (estado) {
      case 'activa':
        return 'bg-success';
      case 'proxima':
        return 'bg-warning text-dark';
      case 'finalizada':
        return 'bg-secondary';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Exposiciones</h2>
        {isAdmin() && !showForm && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            Nueva Exposición
          </button>
        )}
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h4>Nueva Exposición</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Título:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newExposicion.titulo}
                  onChange={(e) => setNewExposicion({...newExposicion, titulo: e.target.value})}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción:</label>
                <textarea
                  className="form-control"
                  value={newExposicion.descripcion}
                  onChange={(e) => setNewExposicion({...newExposicion, descripcion: e.target.value})}
                  rows="3"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Fecha de inicio:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={newExposicion.fecha_inicio}
                    onChange={(e) => setNewExposicion({...newExposicion, fecha_inicio: e.target.value})}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Fecha de fin:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={newExposicion.fecha_fin}
                    onChange={(e) => setNewExposicion({...newExposicion, fecha_fin: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Estado:</label>
                <select
                  className="form-control"
                  value={newExposicion.estado}
                  onChange={(e) => setNewExposicion({...newExposicion, estado: e.target.value})}
                  required
                >
                  <option value="proxima">Próxima</option>
                  <option value="activa">Activa</option>
                  <option value="finalizada">Finalizada</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Imagen:</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setNewExposicion({...newExposicion, imagen: e.target.files[0]})}
                  accept="image/*"
                />
              </div>

              <button type="submit" className="btn btn-primary me-2">
                Guardar Exposición
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
        {exposiciones.map(expo => (
          <div key={expo.id} className="col-md-6 mb-4">
            <div className="card h-100">
              {expo.imagen_url && (
                <img
                  src={`http://localhost:5000/uploads/exposiciones/${expo.imagen_url}`}
                  className="card-img-top"
                  alt={expo.titulo}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title">{expo.titulo}</h5>
                  <span className={`badge ${getStatusBadgeClass(expo.estado)}`}>
                    {expo.estado}
                  </span>
                </div>
                <p className="card-text">{expo.descripcion}</p>
                <p className="text-muted">
                  {new Date(expo.fecha_inicio).toLocaleDateString()} - 
                  {new Date(expo.fecha_fin).toLocaleDateString()}
                </p>
                {isAdmin() && (
                  <div className="mt-2">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(expo.id)}
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

export default Exposiciones; 