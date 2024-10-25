const express = require('express');
const router = express.Router();
const homeController = require('../controller/homeController');

// Rota para buscar todos os psicólogos
router.get('/psychologists', homeController.getPsicologos);

module.exports = router;
