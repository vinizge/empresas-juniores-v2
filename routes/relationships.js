const express = require('express');

const {getRelationship, getRelationships, updateRelationship, deleteRelationship, createRelationship} = require('../controllers/relationships');

const Relationship = require('../models/relationship');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/').get(advancedResults(Relationship), getRelationships).post(createRelationship);

router.route('/:id').get(getRelationship).put(updateRelationship).delete(deleteRelationship);

module.exports = router;