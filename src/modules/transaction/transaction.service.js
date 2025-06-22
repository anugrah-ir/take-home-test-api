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
        throw err;
    }
};

const recordTransaction = async (email, transaction_type, description, total_amount) => {
    try {
        const now = new Date();

        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const invoice_number = `INV${day}${month}${year}`;

        const created_on = now.toISOString();

        const query = `
            INSERT INTO transactions (email, invoice_number, transaction_type, description, total_amount, created_on)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING invoice_number, transaction_type, description, total_amount, created_on
        `;
        const values = [email, invoice_number, transaction_type, description, total_amount, created_on];

        const transaction = await db.query(query, values);
        return transaction.rows[0];
    }
    catch (err) {
        throw err;
    }
};

const getService = async (service_code) => {
    try {
        const query = 'SELECT service_name, service_tariff FROM services WHERE service_code = $1';
        const values = [service_code];

        const service = await db.query(query, values);
        if (service.rows.length === 0) {
            throw { code: 400, status: 102, message: 'Service ataus Layanan tidak ditemukan' }
        }
        return service.rows[0];
    }
    catch (err) {
        throw err;
    }
};

const subtractUserBalance = async (email, total_amount) => {
    try {
        const query = `
            UPDATE users
            SET balance = balance - $1
            WHERE email = $2
            RETURNING balance
        `;
        const values = [total_amount, email];

        const balance = await db.query(query, values);
        return balance.rows[0];
    }
    catch (err) {
        if (err.code === '23514') {
            throw { code: 402, status: 102, message: 'Balance tidak cukup untuk transaksi ini' }
        }
        throw err;
    }
};

const getAllTransactions = async (email, offset, limit) => {
    try {
        let query = 'SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transactions WHERE email = $1 ORDER BY created_on DESC';
        const values = [email];
        if (offset) {
            values.push(offset);
            query += ` OFFSET $${values.length}`;
        }
        if (limit) {
            values.push(limit);
            query += ` LIMIT $${values.length}`;
        }

        const transactions = await db.query(query, values);
        return transactions.rows;
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    getUserBalance,
    addUserBalance,
    recordTransaction,
    getService,
    subtractUserBalance,
    getAllTransactions
};