// src/pages/dashboard/ManageActivitiesPage.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../../services/api';

const ManageActivitiesPage = () => {
  const { childId } = useParams();
  const [activities, setActivities] = useState([]);
  const [topic, setTopic] = useState('');
  const [phonemeLetter, setPhonemeLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (childId) fetchActivities();
  }, [childId]);

  const fetchActivities = async () => {
    try {
      const res = await api.getActivitiesByChild(childId);
      setActivities(res.data);
    } catch (err) {
      console.error('Error al obtener actividades:', err);
    }
  };

  const handleAddActivity = async () => {
    if (!topic.trim() || !phonemeLetter.trim()) return;
    setIsLoading(true);
    const phoneme = `/${phonemeLetter.trim()}/`;
    try {
      const res = await api.generateActivity({ childId, topic, phoneme });
      setActivities([res.data, ...activities]);
      setTopic('');
      setPhonemeLetter('');
    } catch (err) {
      console.error('Error al crear actividad:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      await api.deleteActivity(id);
      setActivities(activities.filter(a => a._id !== id));
    } catch (err) {
      console.error('Error al eliminar actividad:', err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Actividades de Niño</h1>
      <Link to="/dashboard/children" className="text-blue-500 hover:underline mb-4 block">
        ← Volver a Gestión de Niños
      </Link>

      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Tema de la actividad"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          className="border p-2 flex-1"
          disabled={isLoading}
        />
        <input
          type="text"
          placeholder="Fonema (ej: p)"
          value={phonemeLetter}
          onChange={e => setPhonemeLetter(e.target.value)}
          className="border p-2 w-24"
          disabled={isLoading}
        />
        <button
          onClick={handleAddActivity}
          disabled={isLoading}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Generando...
            </span>
          ) : (
            'Agregar Actividad'
          )}
        </button>
      </div>

      <ul className="space-y-4">
        {activities.map(a => (
          <li key={a._id} className="border p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{a.parameters.topic}</p>
              <p className="text-sm italic">Fonema: {a.parameters.phoneme}</p>
              <div className="mt-2">{a.content}</div>
            </div>
            <button
              onClick={() => handleDeleteActivity(a._id)}
              className="text-red-500 hover:underline"
              disabled={isLoading}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageActivitiesPage;
