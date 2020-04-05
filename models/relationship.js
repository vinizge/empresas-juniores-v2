const mongoose = require('mongoose');

const relationshipSchema = new mongoose.Schema({
  person1: {
    type: mongoose.Schema.ObjectId,
    ref: 'Person',
    required: true
  },
  person2: {
    type: mongoose.Schema.ObjectId,
    ref: 'Person',
    required: true
  },
  relation:{
    type: mongoose.Schema.ObjectId,
    ref: 'Relation',
    required: true
  },
  relationship1: String,
  relationship2: String
}); 

module.exports = mongoose.model('Relationship', relationshipSchema);