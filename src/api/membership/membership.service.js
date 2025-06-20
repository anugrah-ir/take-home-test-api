require('dotenv').config();
const db = require('../../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserByEmail = async (email) => {
    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];

        const users = await db.query(query, values);
        return users.rows[0] || null;
    }
    catch (error) {
        throw error;
    }
};

const createUser = async (email, first_name, last_name, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 10);

        const query = `
            INSERT INTO users (email, first_name, last_name, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, first_name, last_name
        `;
        const values = [email, first_name, last_name, hashedPassword];

        const user = await db.query(query, values);
        return user.rows[0];
    }
    catch (error) {
        if (error.code === '23505') {
            throw { code: 400, status: 102, message: 'The email is already registered' }
        }
        throw error;
    }
};

const generateToken = async (email, password) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw { code: 400, status: 103, message: 'Invalid email or password.' }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw { code: 400, status: 103, message: 'Invalid email or password.' }
        }

        const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME || '12h' });
        return token;
    }
    catch (error) {
        throw error;
    }
};

const getUserData = async (email) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw { code: 404, status: 404, message: 'Pengguna tidak ditemukan' }
        }

        delete user.id;
        delete user.password;
        return user;
    }
    catch (error) {
        throw error;
    }
};

const updateUserName = async (email, first_name, last_name) => {
    try {
        const query = `
            UPDATE users
            SET first_name = $1,
            last_name = $2
            WHERE email = $3
            RETURNING id, email, first_name, last_name
        `;
        const values = [first_name, last_name, email];

        const user = await db.query(query, values);
        if (user.rows.length == 0) {
            throw { code: 404, status: 404, message: 'Pengguna tidak ditemukan' }
        }
        return user.rows[0];
    }
    catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    generateToken,
    getUserData,
    updateUserName
};