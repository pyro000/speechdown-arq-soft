// src/context/AuthContext.jsx
import { createContext, useState, useContext } from 'react';
import * as api from '../services/api'; // <-- 1. Importa todo desde tu servicio de API

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = async (email, password) => {
    try {
      const response = await api.loginUser({ email, password });
      // El backend debería devolver los datos del usuario en la propiedad `data`
      const userData = response.data; 
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error en el login:", error.response?.data?.message || error.message);
      throw error; // Lanza el error para que el componente de la UI pueda manejarlo
    }
  };

  const register = async (email, password, role) => {
    try {
      await api.registerUser({ email, password, role });
      // Opcional: podrías hacer login automático después del registro
    } catch (error) {
      console.error("Error en el registro:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};