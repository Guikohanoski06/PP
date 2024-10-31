const express = require('express');
const router = express.Router();
const atualizarPerfilController = require('../controller/atualizarPerfilController');

router.post('/atualizarPerfil', atualizarPerfilController.atualizarPerfil);

module.exports = router;
