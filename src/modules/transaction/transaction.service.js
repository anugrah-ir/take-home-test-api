const db = require('../../config/database');

const getUserBalance = async (email) => {
    try {
        const query = 'SELECT balance FROM users WHERE email = $1';
        const values = [email];

        const balance = await db.query(query, values);
        return balance.rows[0];
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    getUserBalance
};