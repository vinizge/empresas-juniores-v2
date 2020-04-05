const express = require('express');

const {getRelation, getRelations, createRelation, updateRelation, deleteRelation} = require('../controllers/relations');

const Relation = require('../models/relation');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/').get(advancedResults(Relation), getRelations).post(createRelation);

router.route('/:id').get(getRelation).put(updateRelation).delete(deleteRelation);

module.exports = router;