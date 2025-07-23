// src/controllers/activityController.js
const Activity = require('../models/Activity');
const Child = require('../models/Child');
const { generateActivityContent } = require('../services/aiService');

// Generar una nueva actividad, guardarla y devolverla
const generateAndSaveActivity = async (req, res) => {
  const { childId, topic, phoneme } = req.body;
  try {
    const child = await Child.findById(childId);
    if (!child) return res.status(404).json({ message: 'Niño no encontrado' });

    // 1. Llamar al servicio de IA para generar el contenido
    const content = await generateActivityContent(topic, child.age, phoneme);

    // 2. Crear y guardar la nueva actividad en la base de datos
    const activity = await Activity.create({
      childId,
      content,
      parameters: { topic, phoneme },
    });

    // 3. Enviar la actividad recién creada al frontend
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error al generar la actividad', error: error.message });
  }
};

// Obtener el historial de actividades de un niño
const getActivitiesForChild = async (req, res) => {
  try {
    const activities = await Activity.find({ childId: req.params.childId }).sort({ createdAt: -1 });
    res.status(200).json(activities);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener las actividades', error: error.message });
  }
};

// Eliminar una actividad
const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Actividad eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la actividad', error: err.message });
  }
};

module.exports = {
  generateAndSaveActivity,
  getActivitiesForChild,
  deleteActivity,
};
