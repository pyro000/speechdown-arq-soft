// src/controllers/childController.js
const Child = require('../models/Child');

// Crear un nuevo perfil de niño
const createChild = async (req, res) => {
  const { name, age, userId } = req.body; // Por ahora, pasamos el userId en el body
  try {
    const child = await Child.create({ name, age, userId });
    res.status(201).json(child);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el perfil', error: error.message });
  }
};

// Obtener todos los perfiles de un usuario
const getChildrenByUser = async (req, res) => {
  try {
    const children = await Child.find({ userId: req.params.userId });
    res.status(200).json(children);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener los perfiles', error: error.message });
  }
};

// Actualizar un perfil de niño
const updateChild = async (req, res) => {
  try {
    const child = await Child.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!child) return res.status(404).json({ message: 'Perfil no encontrado' });
    res.status(200).json(child);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar', error: error.message });
  }
};

// Borrar un perfil de niño
const deleteChild = async (req, res) => {
  try {
    const child = await Child.findByIdAndDelete(req.params.id);
    if (!child) return res.status(404).json({ message: 'Perfil no encontrado' });
    res.status(200).json({ message: 'Perfil eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar', error: error.message });
  }
};

module.exports = {
  createChild,
  getChildrenByUser,
  updateChild,
  deleteChild,
};