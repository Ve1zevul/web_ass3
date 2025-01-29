const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

router.get('/admin', adminController.getAdmin); // Render admin page
router.post('/admin/add-user', adminController.addUser); // Add a new user
router.get('/admin/edit-user/:id', adminController.getEditUser); // Render edit user page
router.post('/admin/edit-user/:id', adminController.postEditUser); // Handle edit user form submission
router.get('/admin/delete-user/:id', adminController.deleteUser); // Delete a user

module.exports = router;