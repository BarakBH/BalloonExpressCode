const express = require('express');
const router = express.Router();
const addCategories = require('../controllers/categories/add');
const getCategories = require('../controllers/categories/get');
const deleteCategories = require('../controllers/categories/delete');
const { authorizeAdmin } = require('../controllers/auth/authorize');
const editCategories = require('../controllers/categories/edit');

router.post('/categories', authorizeAdmin, addCategories);
router.get('/categories', getCategories);
router.delete('/categories/:id', authorizeAdmin, deleteCategories);
router.put('/categories/:id', authorizeAdmin, editCategories);

module.exports = router;