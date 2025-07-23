// src/models/Child.js
const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del niño es obligatorio'],
  },
  age: {
    type: Number,
    required: [true, 'La edad del niño es obligatoria'],
  },
  // Relación con el modelo de Usuario
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Esto establece una referencia al modelo 'User'
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Child', childSchema);