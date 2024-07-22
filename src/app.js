const express = require("express");
const path = require("path");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const mongoose = require('mongoose');
const { postsRoutes } = require("./routes");
const authRoutes = require("./routes/auth");

// Passport config
require('./utils/passport')(passport);

const app = express();
const viewsPath = path.join(__dirname, './templates/views');
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/techforum')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Define a home route
app.get('/', (req, res) => {
    const example = 'This is an example text.';
    const posts = [
        { title: 'Post 1', content: 'Content of post 1' },
        { title: 'Post 2', content: 'Content of post 2' },
        { title: 'Post 3', content: 'Content of post 3' }
    ];
    res.render('index', { title: 'Home', example, posts });
});

postsRoutes(app);
app.use('/auth', authRoutes);

module.exports = app;
