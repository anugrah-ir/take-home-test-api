const validator = require('validator');
const membershipService = require('./membership.service')

const register = async (req, res) => {
    try {
        const { email, first_name, last_name, password } = req.body;

        isEmailValid = validator.isEmail(email);
        if (!isEmailValid) {
            return res.status(400).send({ status: 400, message: 'Invalid email format.', data: null });
        }

        if (password.length < 8) {
            return res.status(400).send({ status: 400, message: 'Password must be at least 8 characters.', data: null });
        }
        
        const user = await membershipService.register(email, first_name, last_name, password);
        return res.status(200).send({ status: 200, message: 'Register successful.', data: null });
    }
    catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal server error.';
        return res.status(status).send({ status, message, data: null });
    }
};

module.exports = {
    register
};