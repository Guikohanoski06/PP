const express = require('express');
const router = express.Router();
const { getHorario, deleteHorario } = require('../controller/verHorarioController'); // Ajuste o caminho conforme sua estrutura

// Endpoint para obter atendimentos
router.get('/atendimentos', getHorario);

// Endpoint para deletar um atendimento
router.delete('/atendimentos/:id', deleteHorario); // Inclui o ID na rota

module.exports = router;
