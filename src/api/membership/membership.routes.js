const express = require('express');
const membershipRoutes = express.Router();
const { register, login, getProfile } = require('./membership.controller');
const { registrationSchema, loginSchema, handleValidation } = require('../../middleware/validators/membership.validator');
const verifyToken = require('../../middleware/jwt.middleware');

membershipRoutes
    .use('/registration', registrationSchema, handleValidation, register)
    .use('/login', loginSchema, handleValidation, login)
    .use('/profile', verifyToken, getProfile);

module.exports = membershipRoutes;