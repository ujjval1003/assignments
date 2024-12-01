const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(cookieParser());

// JWT Secret Key
const jwtSecretKey = crypto.randomBytes(64).toString('hex');

// Database
mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Mongoose Connected!!"))
  .catch((err) => console.log("Error: ", err));

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    sem: Number
});

const Student = mongoose.model('Student', studentSchema);

// Check if JWT token is valid
function isAuthenticated(req, res, next) {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.redirect('/');
    }

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.redirect('/');
        }
        req.user = decoded;
        next();
    });
}

// Login Route
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', async (req, res) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
        return res.send('Invalid Email or Password');
    }

    if (student.password === password) {
        const token = jwt.sign({ email: student.email, id: student._id }, jwtSecretKey, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
        res.redirect('/students/list/');
    } else {
        res.send("Wrong Password");
    }
});

// Logout Route
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

// Student List
app.get('/students/list/', isAuthenticated, async (req, res) => {
    const students = await Student.find();
    res.render('list', { students });
});

// Registration Route
app.get('/students/new/', (req, res) => {
    res.render('register');
});

app.post('/students/', async (req, res) => {
    const { name, email, password, sem } = req.body;
    const student = new Student({ name, email, password, sem });
    await student.save();
    res.redirect('/students/list/');
});

// Edit Route
app.get('/students/edit/:id', isAuthenticated, async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.render('edit', { student });
});

app.post('/students/update/:id', isAuthenticated, async (req, res) => {
    const student = await Student.findById(req.params.id);
    student.name = req.body.name;
    student.sem = req.body.sem;
    student.email = req.body.email;
    student.password = req.body.password;
    await student.save();
    res.redirect('/students/list/');
});

// Delete Route
app.post('/students/delete/:id', isAuthenticated, async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect('/students/list/');
});

// Start the server
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000");
});