const express = require('express');
const membershipRoutes = express.Router();

const { registrationSchema, loginSchema, handleValidation } = require('../../middleware/validators/membership.validator');

const { register, login } = require('./membership.controller');

membershipRoutes
    .use('/registration', registrationSchema, handleValidation, register)
    .use('/login', loginSchema, handleValidation, login);

module.exports = membershipRoutes;