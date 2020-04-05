const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
  relation1: {
    type: String,
    required: [true, 'Por favor adicione a primeira relação'],
    unique: true
  },
 relation2: {
    type: String,
    required: [true, 'Por favor adicione a segunda relação'],
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Relation', relationSchema);