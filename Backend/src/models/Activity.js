// src/models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  childId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Child',
  },
  // El tipo de ejercicio que se generó
  type: {
    type: String,
    required: true,
    enum: ['cuento', 'juego de palabras'],
    default: 'cuento',
  },
  // El texto generado por la IA
  content: {
    type: String,
    required: true,
  },
  // Parámetros usados para generar la actividad, útil para análisis futuro
  parameters: {
    topic: String,
    phoneme: String,
  },
  // Un campo simple para registrar el progreso
  status: {
    type: String,
    enum: ['pendiente', 'completada'],
    default: 'pendiente',
  }
}, {
  timestamps: true, // Registra cuándo se creó la actividad
});

module.exports = mongoose.model('Activity', activitySchema);