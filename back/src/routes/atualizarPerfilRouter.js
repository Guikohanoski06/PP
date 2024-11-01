const express = require('express');
const router = express.Router();
const atualizarPerfilController = require('../controller/atualizarPerfilController');

router.put('/atualizarPerfil', atualizarPerfilController.atualizarPerfil); // Altere para PUT
router.put('/atualizarPerfilPsicologo', atualizarPerfilController.atualizarPerfilPsicologo); // Altere para PUT

module.exports = router;
