import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';
import { useAuth } from '../context/AuthContext';

function Planos() {
  const { isAdmin } = useAuth();
  const [planos, setPlanos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPlano, setNewPlano] = useState({
    nombre: '',
    descripcion: '',
    archivo: null
  });

  useEffect(() => {
    loadPlanos();
  }, []);

  const loadPlanos = async () => {
    try {
      const response = await axiosInstance.get('/planos');
      setPlanos(response.data);
    } catch (error) {
      console.error('Error al cargar los planos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', newPlano.nombre);
    formData.append('descripcion', newPlano.descripcion);
    formData.append('plano', newPlano.archivo);

    try {
      await axiosInstance.post('/planos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      loadPlanos();
      setShowForm(false);
      setNewPlano({ nombre: '', descripcion: '', archivo: null });
    } catch (error) {
      console.error('Error al subir el plano:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este plano?')) {
      try {
        await axiosInstance.delete(`/planos/${id}`);
        loadPlanos();
      } catch (error) {
        console.error('Error al eliminar el plano:', error);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Planos del Museo</h2>
        {isAdmin() && !showForm && (
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            Agregar Nuevo Plano
          </button>
        )}
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h4>Nuevo Plano</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newPlano.nombre}
                  onChange={(e) => setNewPlano({...newPlano, nombre: e.target.value})}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción:</label>
                <textarea
                  className="form-control"
                  value={newPlano.descripcion}
                  onChange={(e) => setNewPlano({...newPlano, descripcion: e.target.value})}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Archivo:</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setNewPlano({...newPlano, archivo: e.target.files[0]})}
                  accept="image/*"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary me-2">
                Guardar Plano
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
        {planos.map(plano => (
          <div key={plano.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={`http://localhost:5000/uploads/planos/${plano.archivo_url}`}
                className="card-img-top"
                alt={plano.nombre}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{plano.nombre}</h5>
                <p className="card-text">{plano.descripcion}</p>
                <p className="text-muted">
                  Subido: {new Date(plano.fecha_creacion).toLocaleDateString()}
                </p>
                {isAdmin() && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(plano.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Planos; 