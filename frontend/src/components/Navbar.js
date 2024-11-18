import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">MUSEO</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/exposiciones">Exposiciones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/planos">Planos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/visitas">Visitas Guiadas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/info-basica">Información</Link>
            </li>
          </ul>
          
          {user ? (
            <div className="d-flex align-items-center">
              <span className="text-light me-3">
                {user.nombre} 
                <span className="badge bg-secondary ms-2">
                  {user.rol === 'admin' ? 'Administrador' : 'Visitante'}
                </span>
              </span>
              <button 
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="btn btn-outline-light me-2">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-light">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 