const { getUserBalance } = require('./transaction.service');

const getBalance = async (req, res) => {
    try {
        const email = req.user.email;
        const balance = await getUserBalance(email);
        return res.status(200).json({ status: 0, message: 'Get balance berhasil', data: balance });
    }
    catch (err) {
        return res.status(err.code || 500).json({
            status: err.status || 500,
            message: err.message ||'Internal server error',
            data: err.data || null
        });
    }
};

module.exports = {
    getBalance
};