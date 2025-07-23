# SpeechDown: Apoyo Terapéutico del Habla con IA

**SpeechDown** es una aplicación web *full-stack* diseñada como herramienta de apoyo para la terapia del habla en niños con Síndrome de Down. Mediante inteligencia artificial generativa, genera ejercicios personalizados y adaptados al contexto latinoamericano, fomentando la práctica de fonemas y actividades lúdicas que refuerzan el aprendizaje.

---

## Tecnologías Utilizadas

| Área                    | Tecnología                                                     |
| :---------------------- | :------------------------------------------------------------- |
| **Frontend**            | React.js, Vite, Tailwind CSS v4, React Router, Axios, Recharts |
| **Backend**             | Node.js, Express.js, Mongoose, CORS                            |
| **Base de Datos**       | MongoDB                                                        |
| **IA Generativa**       | Ollama (modelo `qwen3` o similar)                              |
| **Control de Versiones**| Git, GitHub                                                    |

---

## Diagrama de Arquitectura

El proyecto sigue una arquitectura desacoplada **cliente-servidor**:

![Arquitectura de la Aplicación](https://i.imgur.com/example.png)  
> **Figura:** El frontend (React) se comunica vía REST con el backend (Node.js/Express), que gestiona MongoDB y el servicio de IA local (Ollama).

---

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalados:

- [Node.js v18+](https://nodejs.org/)  
- [Git](https://git-scm.com/)  
- [MongoDB Community](https://www.mongodb.com/try/download/community) (o una cuenta en MongoDB Atlas)  
- [Ollama](https://ollama.com/) con un modelo descargado (p. ej. `qwen3`)

---

## Instalación y Despliegue

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/tu_usuario/speechdown.git
   cd speechdown
   ```

2. **Configurar el Backend**  
   ```bash
   cd backend
   npm install
   ```  
   Crea un archivo `.env` en `backend/` con estas variables:  
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/speechdownDB
   OLLAMA_API_URL=http://localhost:11434/api/generate
   ```

3. **Configurar el Frontend**  
   ```bash
   cd ../frontend
   npm install
   ```  
   > _No se requiere `.env` para el frontend en esta configuración básica._

4. **Levantar los servicios**  
   - **Terminal 1 (Ollama):**  
     ```bash
     ollama serve
     ```
   - **Terminal 2 (Backend):**  
     ```bash
     cd backend
     npm start
     ```
   - **Terminal 3 (Frontend):**  
     ```bash
     cd frontend
     npm run dev
     ```  
   Abre tu navegador en `http://localhost:5173`.

---

## Uso y Flujo de Trabajo

1. Ingresa datos básicos del paciente (nombre, edad, fonemas a practicar).  
2. Selecciona el tipo de ejercicio (cuento, frases, vocabulario).  
3. La IA generará automáticamente contenido adaptado al fonema y nivel de lectura.  
4. Imprime o comparte los ejercicios con terapeutas y padres de familia.

---

## Ejemplos de Prompts para la IA

Actúa como un terapeuta del habla experto en síndrome de Down.  
Tu tarea es crear un cuento corto (4 – 6 oraciones) para un niño de 6 años.

**CONTEXTO**  
- Tema: “jugar en el parque”  
- Fonema objetivo: /p/ en posición inicial de sílaba  
- Lenguaje: simple, positivo, repetitivo  
- Enfoque cultural: Latinoamérica

**RESTRICCIONES**  
- NO expliques tu rol.  
- NO uses palabras complejas.  
- Longitud: 4 a 6 oraciones.

**EJEMPLO DE SALIDA**  
“Pepe el pato pasea por el pasto.  
Pepe pisa una piedra.  
¡Pobre Pepe!  
Su papá le pone un parche.  
Pepe el pato puede pasear otra vez.”

— Ahora, genera un nuevo cuento con el tema y fonema dados.

---

## Contribuciones

1. Haz un _fork_ del proyecto.  
2. Crea una rama con tu feature o fix:  
   ```bash
   git checkout -b feature/nombre-de-tu-feature
   ```  
3. Realiza tus cambios y haz commit.  
4. Abre un _pull request_ describiendo tus mejoras.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
