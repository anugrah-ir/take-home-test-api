const { createUser, generateToken, getUserData, updateUserName, updateUserProfileImage } = require('./membership.service')

const register = async (req, res) => {
    try {
        const { email, first_name, last_name, password } = req.body;

        await createUser(email, first_name, last_name, password);

        return res.status(200).json({ status: 0, message: 'Registrasi berhasil silahkan login', data: null });
    }
    catch (err) {
        return res.status(err.code || 500).json({
            status: err.status || 500,
            message: err.message ||'Internal server error',
            data: err.data || null
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const token = await generateToken(email, password);

        return res.status(200).json({ status: 0, message: 'Login Sukses', data: { token: token } });
    }
    catch (err) {
        console.log(err);
        return res.status(err.code || 500).json({
            status: err.status || 500,
            message: err.message ||'Internal server error',
            data: err.data || null
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const email = req.user.email;

        const user = await getUserData(email);

        return res.status(200).json({ status: 0, message: 'Sukses', data: user });
    }
    catch (err) {
        return res.status(err.code || 500).json({
            status: err.status || 500,
            message: err.message ||'Internal server error',
            data: err.data || null
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
    catch (err) {
        return res.status(err.code || 500).json({
            status: err.status || 500,
            message: err.message ||'Internal server error',
            data: err.data || null
        });
    }
};

const updateProfileImage = async (req, res) => {
    try {
        const email = req.user.email;
        const fileName = req.file.filename;
        const user = await updateUserProfileImage(email, fileName);
        return res.status(200).json({ status: 0, message: 'Update Profile Image berhasil', data: user });
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
    register,
    login,
    getProfile,
    updateProfile,
    updateProfileImage
};