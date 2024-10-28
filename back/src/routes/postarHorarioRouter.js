const { Router } = require('express');
const router = Router();
const { storeConsulta } = require('../controller/postarHorarioController');

router.post('/horario/create', storeConsulta);

module.exports = router;
