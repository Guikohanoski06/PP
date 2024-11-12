const express = require('express');
const router = express.Router();
const { agendarConsulta, atualizarStatus, buscarConsultasConfirmadas } = require('../controller/atendimentosController');

// Rota para agendar uma nova consulta
router.post('/consultas', agendarConsulta);

// Rota para atualizar o status de uma consulta
router.patch('/consultas/:id/status', atualizarStatus);

// Rota para buscar consultas confirmadas ou pendentes de um usuário
router.get('/consultas/:userId', buscarConsultasConfirmadas);

module.exports = router;
