const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    res.render('login', { error: null, user: req.session.user || null });
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.render('login', { error: 'Invalid username or password', user: null });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { error: 'An error occurred. Please try again.', user: null });
    }
};

exports.getRegister = (req, res) => {
    res.render('register', { error: null, user: req.session.user || null });
};
exports.getLogin = (req, res) => {
    res.render('login', { error: null, user: req.session.user || null });
};
exports.postRegister = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.render('register', { error: 'Username already exists', user: null });
        }

        const newUser = new User({
            userId: `user${Date.now()}`, // Generate a unique user ID
            username,
            password,
        });

        await newUser.save();
        res.redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.render('register', { error: 'An error occurred. Please try again.', user: null });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/');
    });
};