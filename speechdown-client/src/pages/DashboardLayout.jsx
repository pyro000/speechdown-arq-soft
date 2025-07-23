// src/pages/DashboardLayout.jsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar'; // Crearemos este componente

const DashboardLayout = () => {
  const { user } = useAuth();

  // Si no hay usuario, redirigir a la página de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Outlet renderiza la ruta hija que corresponda */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;