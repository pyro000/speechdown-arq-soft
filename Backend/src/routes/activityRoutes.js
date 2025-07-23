// src/routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const { generateAndSaveActivity, getActivitiesForChild, deleteActivity } = require('../controllers/activityController');

router.post('/generate', generateAndSaveActivity);
router.get('/child/:childId', getActivitiesForChild);
router.delete('/:id', deleteActivity);

module.exports = router;