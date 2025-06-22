const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

const registrationSchema = [
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Paramter email tidak sesuai format')
        .isLength({ max: 254 }).withMessage('Email must not exceed 254 characters.')
        .normalizeEmail(),
    body('first_name')
        .notEmpty().withMessage('First name is required.')
        .trim()
        .isLength({ min: 1, max: 50 }).withMessage('First name must be between 1 and 50 characters.')
        .matches(/^[a-zA-Z' -]+$/).withMessage("First name can only contain letters (a-z, A-Z), apostrophes ('), hyphens (-), and spaces."),
    body('last_name')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 50 }).withMessage('Last name must not exceed 50 characters.')
        .matches(/^[a-zA-Z' -]+$/).withMessage("Last name can only contain letters (a-z, A-Z), apostrophes ('), hyphens (-), and spaces."),
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 8, max: 72 }).withMessage('Password must be between 8 and 72 characters.')
];

const loginSchema = [
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Paramter email tidak sesuai format')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required.')
];

const topupSchema = [
  body('top_up_amount')
    .isInt({ min: 0 }).withMessage('Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 102, message: errors.array()[0].msg, data: null });
    }
    next();
};

module.exports = {
    registrationSchema,
    loginSchema,
    topupSchema,
    validateRequest
};