const express = require('express');
const router = express.Router();
const atendimentoController = require('../controller/dataMarcadaController');

router.get('/atendimentos/user/:user_id', atendimentoController.getHorariosPorUsuario);

router.patch('/atendimentos/agendar/:atendimento_id', atendimentoController.agendarAtendimento);

module.exports = router;
