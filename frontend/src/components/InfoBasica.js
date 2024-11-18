import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';
import { useAuth } from '../context/AuthContext';

function InfoBasica() {
  const { isAdmin } = useAuth();
  const [info, setInfo] = useState({
    nombre: '',
    descripcion: '',
    direccion: '',
    telefono: '',
    email: '',
    horario: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = async () => {
    try {
      const response = await axiosInstance.get('/info');
      setInfo(response.data);
    } catch (error) {
      console.error('Error al cargar la información:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/info', info);
      alert('Información guardada correctamente');
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar la información');
    }
  };

  return (
    <div>
      <h2>Información Básica del Museo</h2>
      
      {!isEditing ? (
        <div className="card">
          <div className="card-body">
            <h3>{info.nombre}</h3>
            <p className="lead">{info.descripcion}</p>
            <hr />
            <p><strong>Dirección:</strong> {info.direccion}</p>
            <p><strong>Teléfono:</strong> {info.telefono}</p>
            <p><strong>Email:</strong> {info.email}</p>
            <p><strong>Horario:</strong> {info.horario}</p>
            
            {isAdmin() && (
              <button 
                className="btn btn-primary"
                onClick={() => setIsEditing(true)}
              >
                Editar Información
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del Museo:</label>
            <input
              type="text"
              className="form-control"
              value={info.nombre}
              onChange={(e) => setInfo({...info, nombre: e.target.value})}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción:</label>
            <textarea
              className="form-control"
              value={info.descripcion}
              onChange={(e) => setInfo({...info, descripcion: e.target.value})}
              rows="3"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección:</label>
            <input
              type="text"
              className="form-control"
              value={info.direccion}
              onChange={(e) => setInfo({...info, direccion: e.target.value})}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono:</label>
            <input
              type="text"
              className="form-control"
              value={info.telefono}
              onChange={(e) => setInfo({...info, telefono: e.target.value})}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={info.email}
              onChange={(e) => setInfo({...info, email: e.target.value})}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Horario:</label>
            <textarea
              className="form-control"
              value={info.horario}
              onChange={(e) => setInfo({...info, horario: e.target.value})}
              rows="2"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Guardar Cambios
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancelar
          </button>
        </form>
      )}
    </div>
  );
}

export default InfoBasica; 