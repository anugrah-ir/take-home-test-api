const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        const sanitizedBaseName = baseName.replace(/\s+/g, '-');

        cb(null, `${sanitizedBaseName}${ext}`);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb({
            code: 400,
            status: 102,
            message: 'Format Image tidak sesuai'
        }, false);
    }
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

module.exports = upload;