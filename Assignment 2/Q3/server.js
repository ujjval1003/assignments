const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const app = express();
const PORT = process.env.PORT || 3000;

const redisClient = redis.createClient({
  host: 'localhost', 
  port: 6379,
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  store: new RedisStore({ client: redisClient }), 
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

const users = {
  'user1': { password: 'password1' },
  'user2': { password: 'password2' }
};

function isLoggedIn(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

app.get('/login', (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <label for="username">Username:</label>
      <input type="text" name="username" required /><br />
      <label for="password">Password:</label>
      <input type="password" name="password" required /><br />
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username] && users[username].password === password) {
    req.session.user = username;
    res.redirect('/dashboard'); 
  } else {
    res.send('Invalid credentials. Please <a href="/login">try again</a>');
  }
});

app.get('/dashboard', isLoggedIn, (req, res) => {
  res.send(`
    <h2>Welcome, ${req.session.user}</h2>
    <p>This is the dashboard. You are logged in!</p>
    <a href="/logout">Logout</a>
  `);
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error in logging out');
    }
    res.redirect('/login');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});