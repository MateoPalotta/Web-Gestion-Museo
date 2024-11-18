import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="home-container">
      <div className="jumbotron text-center">
        <h1 className="display-4">Bienvenido al Museo</h1>
        <p className="lead">
          Explora nuestras exposiciones, planos y visitas guiadas.
        </p>
        <hr className="my-4" />
        
        {!user ? (
          <div className="mt-4">
            <button 
              className="btn btn-primary btn-lg me-3"
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </button>
            <button 
              className="btn btn-outline-primary btn-lg"
              onClick={() => navigate('/register')}
            >
              Registrarse
            </button>
          </div>
        ) : (
          <div className="row mt-4">
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Exposiciones</h5>
                  <p className="card-text">Explora nuestras exposiciones actuales y próximas.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/exposiciones')}
                  >
                    Ver Exposiciones
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Planos</h5>
                  <p className="card-text">Consulta los planos del museo.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/planos')}
                  >
                    Ver Planos
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Visitas Guiadas</h5>
                  <p className="card-text">Conoce nuestras visitas guiadas disponibles.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/visitas')}
                  >
                    Ver Visitas
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Información</h5>
                  <p className="card-text">Información general del museo.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate('/info-basica')}
                  >
                    Ver Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home; 