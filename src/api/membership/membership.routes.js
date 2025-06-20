const express = require('express');
const membershipRoutes = express.Router();
const { register, login, getProfile, updateProfile } = require('./membership.controller');
const { registrationSchema, loginSchema, handleValidation } = require('../../middleware/validators/membership.validator');
const verifyToken = require('../../middleware/jwt.middleware');

membershipRoutes
    .post('/registration', registrationSchema, handleValidation, register)
    .post('/login', loginSchema, handleValidation, login)
    .get('/profile', verifyToken, getProfile)
    .put('/profile/update', verifyToken, updateProfile);

module.exports = membershipRoutes;