const { createUser, generateToken, getUserData, updateUserName } = require('./membership.service')

const register = async (req, res) => {
    try {
        const { email, first_name, last_name, password } = req.body;

        await createUser(email, first_name, last_name, password);

        return res.status(200).json({ status: 0, message: 'Register successful.', data: null });
    }
    catch (error) {
        return res.status(error.code || 500).json({
            status: error.status || 500,
            message: error.message ||'Internal server error',
            data: error.data || null
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await generateToken(email, password);

        return res.status(200).json({ status: 0, message: 'Login Successful.', data: { token: token } });
    }
    catch (error) {
        return res.status(error.code || 500).json({
            status: error.status || 500,
            message: error.message ||'Internal server error',
            data: error.data || null
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const email = req.user.email;

        const user = await getUserData(email);

        return res.status(200).json({ status: 0, message: 'Sukses', data: user });
    }
    catch (error) {
        return res.status(error.code || 500).json({
            status: error.status || 500,
            message: error.message ||'Internal server error',
            data: error.data || null
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const email = req.user.email;
        const { first_name, last_name } = req.body;

        const user = await updateUserName(email, first_name, last_name);
        return res.status(200).json({ status: 0, message: 'Update Pofile berhasil', data: user });
    }
    catch (error) {
        return res.status(error.code || 500).json({
            status: error.status || 500,
            message: error.message ||'Internal server error',
            data: error.data || null
        });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile
};