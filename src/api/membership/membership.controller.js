const { findUserByEmail, createUser } = require('./membership.service')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { email, first_name, last_name, password } = req.body;

        const isEmailRegistered = await findUserByEmail(email);
        if (isEmailRegistered) {
            return res.status(400).json({ status: 102, message: 'The email is already registered', data: null });
        }
        
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 10);;

        await createUser(email, first_name, last_name, hashedPassword);
        return res.status(200).json({ status: 0, message: 'Register successful.', data: null });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Internal server error.', data: null });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ status: 103, message: 'Invalid email or password.', data: null });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: 103, message: 'Invalid email or password.', data: null });
        }

        const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME || '12h' });
        return res.status(200).json({ status: 0, message: 'Login Successful.', data: { token: token } });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, message: 'Internal server error.', data: null });
    }
};

module.exports = {
    register,
    login
};