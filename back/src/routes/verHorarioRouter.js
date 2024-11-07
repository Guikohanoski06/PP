const express = require('express');
const router = express.Router();
const { getHorario, deleteHorario } = require('../controller/verHorarioController');

router.get('/atendimentos', getHorario);

router.delete('/atendimentos/:id', deleteHorario);

module.exports = router;
