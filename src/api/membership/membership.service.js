const db = require('../../config/database');
const bcrypt = require('bcrypt');

const register = async (email, first_name, last_name, password) => {
    const findUsers = 'SELECT * FROM users WHERE email = $1';
    const users = await db.query(findUsers, [email]);
    if (users.rows.length > 0) {
        throw { status: 400, message: 'The email is already registered' };
    }
    
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
    register
};