const {Router} = require('express');
const router = Router();
const { storeUserPsi } = require('../controller/userControllerPsi');

router.post('/user/createpsi', storeUserPsi);

module.exports = router;