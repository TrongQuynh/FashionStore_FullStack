const express = require('express');
const router = express.Router();

const accountController = require("../../controller/accountController");

// [POST] /api/account/login
router.post("/login", accountController.login);

// [POST] /api/account/register
router.post("/register", accountController.register);

module.exports = router;