import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import InfoBasica from './components/InfoBasica';
import Planos from './components/Planos';
import Exposiciones from './components/Exposiciones';
import VisitasGuiadas from './components/VisitasGuiadas';

function App() {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/info-basica" 
            element={
              <ProtectedRoute>
                <InfoBasica />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/planos" 
            element={
              <ProtectedRoute>
                <Planos />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/exposiciones" 
            element={
              <ProtectedRoute>
                <Exposiciones />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/visitas" 
            element={
              <ProtectedRoute>
                <VisitasGuiadas />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
