// src/services/aiService.js
const axios = require('axios');
//const https = require('https');

//const httpsAgent = new https.Agent({ rejectUnauthorized: false });

// La URL donde está corriendo tu API de Ollama
const OLLAMA_API_URL = "https://44ae48958b54.ngrok-free.app/api/generate"; //process.env.OLLAMA_API_URL + "/api/generate";

/**
 * Genera contenido terapéutico usando Ollama.
 * @param {string} topic - El tema principal, ej: "animales de la granja".
 * @param {number} childAge - La edad del niño para adaptar el lenguaje.
 * @param {string} phoneme - El fonema a practicar, ej: "/p/".
 * @returns {Promise<string>} - El contenido generado por la IA.
 */
const generateActivityContent = async (topic, childAge, phoneme) => {
  // **Prompt Terapéutico Detallado:** Esta es la parte más importante.
  const prompt = `
    Actúa como un terapeuta del habla experto en síndrome de Down.
    Tu tarea es crear un cuento corto (de 4 a 6 oraciones) para un niño de ${childAge} años.
    El cuento debe ser sobre "${topic}".
    El objetivo principal es practicar la repetición del fonema "${phoneme}" en posición inicial de sílaba.
    Usa un lenguaje extremadamente simple, positivo y repetitivo, adecuado para el contexto cultural de Latinoamérica.
    NO incluyas explicaciones sobre tu rol, solo entrega el cuento.

    Ejemplo si te pido un cuento sobre "un pato" con el fonema "/p/":
    "Pepe el pato pasea por el pasto. Pepe pisa una piedra. ¡Pobre Pepe! Su papá le pone un parche. Pepe el pato puede pasear otra vez."

    También no generes texto adicional como Aquí está el cuento o espero lo disfrutes!, solo pon el cuento sin comillas y ya.

    Ahora, genera un nuevo cuento con el tema y fonema que te he dado.
  `;

  try {
    console.log('🤖 Enviando prompt a Ollama...');
    const response = await axios.post(OLLAMA_API_URL, {
      // Elige el modelo que tengas descargado, ej: "llama3", "mistral"
      model: "llama3:latest", 
      prompt: prompt,
      stream: false // Importante: para recibir la respuesta completa de una vez
    },
    /*{
      // Aquí indicamos que siga hasta 10 redirecciones
      maxRedirects: 10,
      // Y usamos el agente HTTPS que ignora certificados
      httpsAgent
    }*/
    {
      headers: {
        // ESTA ES LA LÍNEA CLAVE QUE SOLUCIONA EL PROBLEMA
        'ngrok-skip-browser-warning': 'true'
      }
    }
  );

    console.log('✅ Respuesta recibida de Ollama.');
    // La respuesta de Ollama es un objeto JSON, el texto está en la propiedad `response`
    return response.data.response.trim();

  } catch (error) {
    console.error('❌ Error al contactar con Ollama:', error.message);
    // Imprimimos más detalles del error si están disponibles
    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
    }
    throw new Error('No se pudo generar el contenido con la IA.');
  }
};

module.exports = {
  generateActivityContent,
};