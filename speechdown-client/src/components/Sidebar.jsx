// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaChild, FaMagic, FaChartBar, FaSignOutAlt } from 'react-icons/fa'; // Íconos

const Sidebar = () => {
  const { user, logout } = useAuth();

  // Estilos para los links, incluyendo el estado activo
  const linkStyles = "flex items-center p-3 my-1 rounded-lg transition-colors";
  const activeLinkStyles = "bg-blue-500 text-white";
  const inactiveLinkStyles = "hover:bg-blue-100 text-gray-700";

  return (
    <aside className="w-64 bg-white p-4 shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-blue-600">SpeechDown</h2>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
      <nav>
        <NavLink to="/dashboard/children" className={({isActive}) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
          <FaChild className="mr-3" /> Mis Niños
        </NavLink>
        {/*<NavLink to="/dashboard/generate" className={({isActive}) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
          <FaMagic className="mr-3" /> Generar Actividad
        </NavLink>*/}
        {/* ... más links aquí (progreso, biblioteca) ... */}
      </nav>
      <button onClick={logout} className={`${linkStyles} ${inactiveLinkStyles} w-full mt-auto`}>
        <FaSignOutAlt className="mr-3" /> Cerrar Sesión
      </button>
    </aside>
  );
};

export default Sidebar;