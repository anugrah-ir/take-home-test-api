const handleUploadError = (err, req, res, next) => {
    if (err && err.status === 102) {
        return res.status(400).json({
            status: 102,
            message: err.message,
            data: null
        });
    }
};

module.exports = handleUploadError;