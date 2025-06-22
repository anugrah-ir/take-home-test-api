const handleUploadError = (err, req, res, next) => {
    if (err) {
        return res.status(err.code || 500).json({
            status: err.status || 500,
            message: err.message ||'Internal server error',
            data: null
        });
    }
};

module.exports = handleUploadError;