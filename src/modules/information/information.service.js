const db = require('../../config/database');

const getAllBanner = async () => {
    try {
        const query = 'SELECT banner_name, banner_image, description FROM banners';
        const banners = await db.query(query);
        return banners.rows;
    }
    catch (err) {
        throw err;
    }
};

const getAllService = async () => {
    try {
        const query = 'SELECT service_code, service_name, service_icon, service_tariff FROM services';
        const services = await db.query(query);
        return services.rows;
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    getAllBanner,
    getAllService
};