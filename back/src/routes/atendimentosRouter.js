// routes/consultaRoutes.js
const express = require('express');
const { verConsultas } = require('../controller/atendimentosController');

const router = express.Router();

router.get('/consultas/:user_id', verConsultas);

module.exports = router;
