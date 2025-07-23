// src/routes/childRoutes.js
const express = require('express');
const router = express.Router();
const { createChild, getChildrenByUser, updateChild, deleteChild } = require('../controllers/childController');

router.post('/', createChild);
router.get('/user/:userId', getChildrenByUser);
router.put('/:id', updateChild);
router.delete('/:id', deleteChild);

module.exports = router;