const express = require('express');
const logRouter = express.Router();
const {login} = require('../controllers/auth.js')
const authMiddleware = require('../validations/v-auth')

logRouter.post('/login',authMiddleware.login, login);


module.exports = logRouter
;



