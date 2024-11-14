const express = require('express');
const router = express.Router();
const atualizarPerfilController = require('../controller/atualizarPerfilController');

router.put('/atualizarPerfil', atualizarPerfilController.atualizarPerfil);
router.put('/atualizarPerfilPsicologo', atualizarPerfilController.atualizarPerfilPsicologo);

module.exports = router;
