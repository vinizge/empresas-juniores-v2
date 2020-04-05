const express = require('express');

const {getUser, getUsers, createUser, updateUser, deleteUser} = require('../controllers/users');

const User = require('../models/users');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;