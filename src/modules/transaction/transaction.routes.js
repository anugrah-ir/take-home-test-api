const express = require('express');
const transactionRoutes = express.Router();
const verifyToken = require('../../middleware/jwt.middleware');
const { getBalance, topup } = require('./transaction.controller');
const { topupSchema, validateRequest } = require('../../middleware/request.validator');

transactionRoutes
    .get('/balance', verifyToken, getBalance)
    .post('/topup', verifyToken, topupSchema, validateRequest, topup);

module.exports = transactionRoutes;