const { getAllBanner, getAllService } = require('./information.service');

const getBanners = async (req, res) => {
    try {
        const banners = await getAllBanner();
        return res.status(200).json({ status: 0, message: 'Sukses', data: banners });
    }
    catch (err) {
        return res.status(err.code || 500).json({
            status: err.status || 500,
            message: err.message ||'Internal server error',
            data: err.data || null
        });
    }
};

const getServices = async (req, res) => {
    try {
        const services = await getAllService();
        return res.status(200).json({ status: 0, message: 'Sukses', data: services });
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
    getBanners,
    getServices
};