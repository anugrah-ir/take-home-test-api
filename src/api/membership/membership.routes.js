const express = require('express');
const membershipRoutes = express.Router();

const { register } = require('./membership.controller');

membershipRoutes
    .use('/registration', register);

module.exports = membershipRoutes;