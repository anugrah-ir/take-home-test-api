const express = require('express');
const membershipRoutes = express.Router();
const { register, login, getProfile, updateProfile, updateProfileImage } = require('./membership.controller');
const { registrationSchema, loginSchema, validateRequest } = require('../../middleware/request.validator');
const verifyToken = require('../../middleware/jwt.middleware');
const upload = require('../../middleware/upload.middleware');
const handleUploadError = require('../../middleware/handleUploadError.middleware');

membershipRoutes
    .post('/registration', registrationSchema, validateRequest, register)
    .post('/login', loginSchema, validateRequest, login)
    .get('/profile', verifyToken, getProfile)
    .put('/profile/update', verifyToken, updateProfile)
    .put('/profile/image', verifyToken, upload.single('file'), handleUploadError, updateProfileImage);

module.exports = membershipRoutes;