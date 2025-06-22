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
    catch (err) {
        throw err;
    }
};

const createUser = async (email, first_name, last_name, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 10);
        const default_profile_image = `${process.env.SERVER_URL}/profile.jpeg`

        const query = `
            INSERT INTO users (email, first_name, last_name, password, profile_image)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING email, first_name, last_name
        `;
        const values = [email, first_name, last_name, hashedPassword, default_profile_image];

        const user = await db.query(query, values);
        return user.rows[0];
    }
    catch (err) {
        if (err.code === '23505') {
            throw { code: 400, status: 102, message: 'The email is already registered' }
        }
        throw err;
    }
};

const generateToken = async (email, password) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw { code: 401, status: 103, message: 'Username atau password salah' }
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw { code: 401, status: 103, message: 'Username atau password salah' }
        }

        const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME || '12h' });
        return token;
    }
    catch (err) {
        throw err;
    }
};

const getUserData = async (email) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw { code: 404, status: 404, message: 'Pengguna tidak ditemukan' }
        }

        delete user.id
        delete user.password;
        delete user.balance;
        return user;
    }
    catch (err) {
        throw err;
    }
};

const updateUserName = async (email, first_name, last_name) => {
    try {
        const query = `
            UPDATE users
            SET first_name = $1, last_name = $2
            WHERE email = $3
            RETURNING email, first_name, last_name, profile_image
        `;
        const values = [first_name, last_name, email];

        const user = await db.query(query, values);
        if (user.rows.length == 0) {
            throw { code: 404, status: 404, message: 'Pengguna tidak ditemukan' }
        }
        return user.rows[0];
    }
    catch (err) {
        throw err;
    }
};

const updateUserProfileImage = async (email, fileName) => {
    try {
        const serverUrl = process.env.SERVER_URL;
        fileUrl = `${serverUrl}/${fileName}`

        const query = `
            UPDATE users
            SET profile_image = $1
            WHERE email = $2
            RETURNING email, first_name, last_name, profile_image
        `;
        const values = [fileUrl, email];
        const user = await db.query(query, values);
        if (user.rows.length === 0) {
            throw { code: 404, status: 404, message: 'Pengguna tidak ditemukan' }
        }
        return user.rows[0];
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    createUser,
    generateToken,
    getUserData,
    updateUserName,
    updateUserProfileImage
};