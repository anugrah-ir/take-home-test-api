const { getUserBalance, addUserBalance, recordTransaction, getService, subtractUserBalance } = require('./transaction.service');

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

const topup = async (req, res) => {
    try {
        const email = req.user.email;
        const top_up_amount = req.body.top_up_amount;

        const balance = await addUserBalance(email, top_up_amount);
        await recordTransaction('TOPUP', 'Top Up balance', top_up_amount);
        return res.status(200).json({ status: 0, message: 'Top Up Balance berhasil', data: balance });
    }
    catch (err) {
        return res.status(err.code || 500).json({
            status: err.status || 500,
            message: err.message ||'Internal server error',
            data: err.data || null
        });
    }
};

const transaction = async (req, res) => {
    try {
        const service_code = req.body.service_code;

        const service = await getService(service_code);

        const email = req.user.email;
        await subtractUserBalance(email, service.service_tariff);
        
        const transaction = await recordTransaction('PAYMENT', service.service_name, service.service_tariff);
        return res.status(200).json({ status: 0, message: 'Transaksi berhasil', data: transaction });
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
    getBalance,
    topup,
    transaction
};