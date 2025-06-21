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

const addUserBalance = async (email, top_up_amount) => {
    try {
        const query = `
            UPDATE users
            SET balance = balance + $1
            WHERE email = $2
            RETURNING balance
        `;
        const values = [top_up_amount, email];

        const balance = await db.query(query, values);
        return balance.rows[0];
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};

const recordTransaction = async (transaction_type, description, total_amount) => {
    try {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const invoice_number = `INV${day}${month}${year}`;

        const created_on = now.toISOString();

        const query = `
            INSERT INTO transactions (invoice_number, transaction_type, description, total_amount, created_on)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING invoice_number, transaction_type, description, total_amount, created_on
        `;
        const values = [invoice_number, transaction_type, description, total_amount, created_on];

        const transaction = await db.query(query, values);
        return transaction;
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    getUserBalance,
    addUserBalance,
    recordTransaction
};