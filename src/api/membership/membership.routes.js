const express = require('express');
const membershipRoutes = express.Router();

const { registrationSchema, handleValidation } = require('../../middleware/validators/membership.validator');

const { register } = require('./membership.controller');

membershipRoutes
    .use('/registration', registrationSchema, handleValidation, register);

module.exports = membershipRoutes;