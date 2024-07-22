const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

const passport = require('passport');


// Render login page
router.get('/login', (req, res) => {
    const flashMessage = req?.flash('error') || null;
    console.log(flashMessage);

    res.render('login', { title: 'Login', message: req?.flash('error') });
});

// Render signup page
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});

// Handle signup
router.post('/signup', async (req, res) => {
    console.log(req.body);
    const { first_name, last_name, user_name, email, password } = req.body;
    const avatar = req.file ? req.file.buffer : null;

    try {
        const user = new userModel({ first_name, last_name, user_name, email, password, avatar });
        await user.save();
        req.flash('success_msg', 'You are now registered and can log in');
        res.redirect('/auth/login');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Handle login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

// Handle logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
});

module.exports = router;
