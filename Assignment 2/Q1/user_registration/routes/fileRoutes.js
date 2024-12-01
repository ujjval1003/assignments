const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/register', upload.array('files', 5), async (req, res) => {
    const { name, email, Password } = req.body;
    try {
        const filepaths = req.files.map(file => file.filename); // For multiple files
        res.status(200).json({ files: filepaths });
    } catch (error) {
        res.status(500).json({ error: 'File upload failed!' });
    }

    const newUSer = new User({
        name, email, Password, files: filepath
    });

    await newUSer.Save();
    res.redirect('/files');
});

router.get('/files', async (req, res) => {
    const users = await User.find({});
    res.render('files', { users });
});

router.get('/download/:filename', (req, res) => {
    const filename = res.params.filename;
    const filepath = path.join(__dirname, '../public/uploads/', filename);
    res.download(filepath);
});

module.exports = router;