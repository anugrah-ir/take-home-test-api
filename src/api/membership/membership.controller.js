const { findUserByEmail, createUser } = require('./membership.service')

const register = async (req, res) => {
    try {
        const { email, first_name, last_name, password } = req.body;

        isEmailRegistered = await findUserByEmail(email);
        if (isEmailRegistered) {
            return res.status(400).json({ status: 400, message: 'The email is already registered', data: null });
        }
        
        const user = await createUser(email, first_name, last_name, password);
        return res.status(200).json({ status: 200, message: 'Register successful.', data: null });
    }
    catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal server error.', data: null });
    }
};

module.exports = {
    register
};