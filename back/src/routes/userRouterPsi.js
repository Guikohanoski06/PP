const { Router } = require("express");
const { storeUserPsi } = require("../controller/userControllerPsi");

const router = Router();
router.post("/user/createpsi", storeUserPsi);

module.exports = router;
