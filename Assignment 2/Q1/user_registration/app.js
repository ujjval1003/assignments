const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

mongoose.connect('mongodb://localhost:27017/registrationDB', {
    useNewUrlParser: true,
    // useUnifiedTopologies: true
});

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/', fileRoutes);

app.listen(5000, () => { console.log('Server running on port http://localhost:5000') });