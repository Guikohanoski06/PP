const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Rota para buscar todos os psicólogos
router.get('/psychologists', userController.getPsychologists);

module.exports = router;
