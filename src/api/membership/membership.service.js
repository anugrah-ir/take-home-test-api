const db = require('../../config/database');

const findUserByEmail = async (email) => {
    const findUserByEmail = 'SELECT * FROM users WHERE email = $1';
    const users = await db.query(findUserByEmail, [email]);
    return users.rows[0] || null;
};

const createUser = async (email, first_name, last_name, password) => {
    const createUser = `
        INSERT INTO users (email, first_name, last_name, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, first_name, last_name
        `;
    const user = await db.query(createUser, [email, first_name, last_name, password]);
    return user.rows[0];
};

module.exports = {
    findUserByEmail,
    createUser
};