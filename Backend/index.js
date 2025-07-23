// index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Importar todas las rutas
const userRoutes = require('./src/routes/userRoutes');
const childRoutes = require('./src/routes/childRoutes');     // <-- NUEVO
const activityRoutes = require('./src/routes/activityRoutes'); // <-- NUEVO

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de SpeechDown está funcionando!');
});

// Usar todas las rutas con sus prefijos
app.use('/api/users', userRoutes);
app.use('/api/children', childRoutes);     // <-- NUEVO
app.use('/api/activities', activityRoutes); // <-- NUEVO

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});