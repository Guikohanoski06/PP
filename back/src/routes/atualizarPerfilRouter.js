const express = require('express');
const router = express.Router();
const atualizarPerfilController = require('../controller/atualizarPerfilController');

// Rota para buscar todos os psicólogos
router.get('/atualizarPerfil', atualizarPerfilController.mudarPerfil);

module.exports = router;
