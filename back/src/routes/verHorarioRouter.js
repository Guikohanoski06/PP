const express = require('express');
const router = express.Router();
const { agendarAtendimento, getHorarios, deleteHorario, atualizarStatus, verAtendimentos, confirmarAtendimento } = require('../controller/verHorarioController');

// Rota para buscar os atendimentos de um psicólogo
router.get('/api/atendimentos', getHorarios);

// Rota para deletar um atendimento
router.delete('/api/atendimentos/:id', deleteHorario);

// Rota para atualizar o status do atendimento
router.patch('/api/atendimentos/:id', atualizarStatus);

// Rota para visualizar os atendimentos de um usuário
router.get('/api/atendimentos/:userId', verAtendimentos);

// Rota para confirmar o atendimento
router.patch('/api/atendimentos/:consultaId/confirmar', confirmarAtendimento);

// Rota para agendar o atendimento
router.patch('/api/atendimentos/:id/agendar', agendarAtendimento);

module.exports = router;
