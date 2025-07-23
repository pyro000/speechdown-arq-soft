// src/pages/dashboard/ManageChildrenPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import * as api from '../../services/api';

const ManageChildrenPage = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const fetchChildren = async () => {
    try {
      const response = await api.getChildren(user._id);
      setChildren(response.data);
    } catch (error) {
      console.error('Error al obtener niños:', error);
    }
  };

  useEffect(() => {
    if (user) fetchChildren();
  }, [user]);

  const handleAddChild = async () => {
    if (!name.trim() || !age) return;
    try {
      const response = await api.createChild({ name, age: Number(age), userId: user._id });
      setChildren([...children, response.data]);
      setName('');
      setAge('');
    } catch (error) {
      console.error('Error al crear niño:', error);
    }
  };

  const handleDeleteChild = async (id) => {
    try {
      await api.deleteChild(id);
      setChildren(children.filter((child) => child._id !== id));
    } catch (error) {
      console.error('Error al eliminar niño:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Gestión de Niños</h1>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Nombre del niño"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Edad"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 w-24"
        />
        <button
          onClick={handleAddChild}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Niño
        </button>
      </div>

      <ul className="space-y-4">
        {children.map((child) => (
          <li
            key={child._id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{child.name}</p>
              <p>Edad: {child.age}</p>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/dashboard/children/${child._id}/activities`}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Gestionar Actividades
              </Link>
              <button
                onClick={() => handleDeleteChild(child._id)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageChildrenPage;
