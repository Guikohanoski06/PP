const express = require('express');
const router = express.Router();
const { 
    agendarAtendimento, 
    getHorarios, 
    deleteHorario, 
    atualizarStatus, 
    verAtendimentos, 
    confirmarAtendimento, 
    getHorariosAgendados 
} = require('../controller/verHorarioController');

// Rota para buscar os atendimentos de um psicólogo
router.get('/atendimentos', getHorarios);

// Rota para deletar um atendimento
router.delete('/consultas/:id', deleteHorario);

// Rota para atualizar o status do atendimento
router.patch('/atendimentos/:id', atualizarStatus);

// Rota para visualizar os atendimentos de um usuário
router.get('/atendimentos/:userId', verAtendimentos);

// Rota para confirmar o atendimento
router.patch('/atendimentos/:consultaId/confirmar', confirmarAtendimento);

// Rota para agendar o atendimento
router.patch('/atendimentos/:id/agendar', agendarAtendimento);

// Rota para buscar os horários confirmados de um psicólogo
router.get('/consultas/agendadas', getHorariosAgendados);

module.exports = router;
