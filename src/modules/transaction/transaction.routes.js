const express = require('express');
const transactionRoutes = express.Router();
const verifyToken = require('../../middleware/jwt.middleware');
const { getBalance } = require('./transaction.controller');

transactionRoutes
    .get('/balance', verifyToken, getBalance);

module.exports = transactionRoutes;