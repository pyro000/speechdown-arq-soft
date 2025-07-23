// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error en la conexión a MongoDB: ${error.message}`);
    process.exit(1); // Detiene la app si no se puede conectar
  }
};

module.exports = connectDB;