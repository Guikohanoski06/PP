const express = require('express');
const router = express.Router();

const { loginPsi } = require("../controller/loginControllerPsi");

router.post('/loginpsi', loginPsi);

module.exports = router;
