const express = require('express');
const informationRoutes = express.Router();
const { getBanners, getServices } = require('./information.controller');
const verifyToken = require('../../middleware/jwt.middleware');

informationRoutes
    .get('/banner', getBanners)
    .get('/services', verifyToken, getServices);

module.exports = informationRoutes;