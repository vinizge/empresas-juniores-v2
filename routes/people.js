const express = require('express');

const {getPeople, getPerson, createPerson, updatePerson, deletePerson} = require('../controllers/people');

const Person = require('../models/person');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/').get(advancedResults(Person, 'relationships','relationships2' ), getPeople).post(createPerson);

router.route('/:id').get(getPerson).put(updatePerson).delete(deletePerson);

module.exports = router;