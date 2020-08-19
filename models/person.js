const mongoose = require('mongoose');
const {cpf, cnpj} = require('cpf-cnpj-validator');

const personSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Por favor adicione um nome']
  },
  email: {
    type: String,
    required: [true, 'Por favor adicione um email'],
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Por favor adicione um email válido'
    ]
  },
  type: {
    type: String,
    required: true,
    enum: ['física', 'jurídica']
  },
  cpfOrCnpj: {
    type: String,
    required: [true, 'Por favor adicione um número de CPF/CNPJ'],
    unique: true,
    validate: [validation, 'Por favor adicione um número de CPF/CNPJ válido']
  },
  address: String,
  phone: {
    type: String,
    required: [true, 'Por favor adicione um telefone']
  },
  phone2: String,
  phone3: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
},{
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});
 
function validation() {
  if(this.type == 'física'){
    return cpf.isValid(this.cpfOrCnpj);
  } else {
    return cnpj.isValid(this.cpfOrCnpj);
  }
}

personSchema.virtual('relationships', {
  ref: 'Relationship',
  localField: '_id',
  foreignField: 'person1',
  justOne: false
});

personSchema.virtual('relationships2', {
  ref: 'Relationship',
  localField: '_id',
  foreignField: 'person2',
  justOne: false
});

module.exports = mongoose.model('Person', personSchema);