// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true, // No puede haber dos usuarios con el mismo email
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    // En un proyecto real, aquí se encriptaría la contraseña antes de guardarla
  },
  role: {
    type: String,
    enum: ['terapeuta', 'padre'], // Solo puede tener uno de estos dos valores
    default: 'padre',
  },
}, {
  timestamps: true, // Crea los campos `createdAt` y `updatedAt` automáticamente
});

module.exports = mongoose.model('User', userSchema);