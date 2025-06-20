const db = require('../../config/database');
const bcrypt = require('bcrypt');

const findUserByEmail = async (email) => {
    const findUserByEmail = 'SELECT * FROM users WHERE email = $1';
    const users = await db.query(findUserByEmail, [email]);
    return users.rows.length > 0;
};

const createUser = async (email, first_name, last_name, password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createUser = `
        INSERT INTO users (email, first_name, last_name, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, first_name, last_name
        `;
    const user = await db.query(createUser, [email, first_name, last_name, hashedPassword]);
    return user.rows[0];
};

module.exports = {
    findUserByEmail,
    createUser
};