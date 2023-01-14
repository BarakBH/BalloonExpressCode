const express = require('express');
const router = express.Router();
const { register, registerValidation } = require('../controllers/auth/register');
const { login } = require('../controllers/auth/login');
const { logout } = require('../controllers/auth/logout');
const { authorize } = require('../controllers/auth/authorize');
const Users = require('../models/user.model');
// const { resetPassword } = require('../controllers/auth/forgotPassword');


router.post('/register', registerValidation, register);
router.post('/login', login);
router.post('/logout', logout);
// router.post('/reset-password', resetPassword);
router.get('/customers', authorize, async (req, res) => {
  try {
    const customers = await Users.find({ role: 'customer' });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({message: "Something wrong",error});
  }
})

module.exports = router;