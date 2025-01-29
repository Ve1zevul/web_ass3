const User = require('../models/User');

exports.getAdmin = async (req, res) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.redirect('/');
    }

    try {
        const users = await User.find();
        res.render('admin', { users, user: req.session.user || null });
    } catch (error) {
        console.error('Admin page error:', error);
        res.redirect('/');
    }
};

exports.addUser = async (req, res) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.redirect('/');
    }

    const { username, password, isAdmin } = req.body;

    try {
        const newUser = new User({ username, password, isAdmin: isAdmin === 'on' });
        await newUser.save();
        res.redirect('/admin');
    } catch (error) {
        console.error('Add user error:', error);
        res.redirect('/admin');
    }
};

exports.getEditUser = async (req, res) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.redirect('/');
    }

    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.redirect('/admin');
        }
        res.render('edit-user', { user, user: req.session.user || null });
    } catch (error) {
        console.error('Edit user page error:', error);
        res.redirect('/admin');
    }
};

exports.postEditUser = async (req, res) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.redirect('/');
    }

    const { id } = req.params;
    const { username, password, isAdmin } = req.body;

    try {
        const user = await User.findById(id);
        if (user) {
            user.username = username;
            if (password) user.password = password;
            user.isAdmin = isAdmin === 'on';
            await user.save();
        }
        res.redirect('/admin');
    } catch (error) {
        console.error('Edit user error:', error);
        res.redirect('/admin');
    }
};

exports.deleteUser = async (req, res) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.redirect('/');
    }

    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.redirect('/admin');
    } catch (error) {
        console.error('Delete user error:', error);
        res.redirect('/admin');
    }
};