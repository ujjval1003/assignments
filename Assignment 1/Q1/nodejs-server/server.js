const express = require('express');
const path = require('path');
const bodyParse = require('body-parse');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParse.urlencoded({ extended:true }));
app.use(bodyParse.json());

app.get('api/data', (req, res) => {
    res.json({ massage:"This is your GET response!" });
});

app.post('api/data', (req, res) => {
    const data = req.body;
    res.json({ massage:"POST data recived!!", data });
});

app.listen(5000, () => {console.log('Server is running at http: 5000')});