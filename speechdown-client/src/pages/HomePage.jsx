// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800">
      <nav className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">SpeechDown</h1>
        <div>
          <Link to="/login" className="px-4 py-2 rounded hover:bg-blue-100">Iniciar Sesión</Link>
          <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Registrarse</Link>
        </div>
      </nav>
      
      <main className="container mx-auto text-center py-20 px-4">
        
        <h2 className="text-5xl font-extrabold mb-4">Apoyo Terapéutico del Habla, Potenciado por IA</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Herramientas interactivas y personalizadas para ayudar en el desarrollo del habla de niños con Síndrome de Down.
        </p>
        <Link to="/register" className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300">
          Comienza Ahora
        </Link>
      </main>
    </div>
  );
};

export default HomePage;