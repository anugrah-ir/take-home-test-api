const express = require('express');
const transactionRoutes = express.Router();
const verifyToken = require('../../middleware/jwt.middleware');
const { getBalance, topup, transaction, getTransactionHistory } = require('./transaction.controller');
const { topupSchema, validateRequest } = require('../../middleware/request.validator');

transactionRoutes
    .get('/balance', verifyToken, getBalance)
    .post('/topup', verifyToken, topupSchema, validateRequest, topup)
    .post('/transaction', verifyToken, transaction)
    .get('/transaction/history', verifyToken, getTransactionHistory);

module.exports = transactionRoutes;