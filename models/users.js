const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {cpf} = require('cpf-cnpj-validator');

const userSchema = new mongoose.Schema({
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
  cpf: {
    type: String,
    required: [true, 'Por favor adicione um número de CPF'],
    unique: true,
    validate: [validaCPF, 'Por favor adicione um número de CPF válido']
  },
  address: String,
  phone: {
    type: String,
    required: [true, 'Por favor adicione um telefone']
  },
  phone2: String,
  phone3: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Por favor adicione uma senha'],
    minlength: 6,
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Encripta a senha usando bcrypt
userSchema.pre('save', async function(next){
  
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Cria o JWT e devolve
userSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
}

//Verifica usuário e senha encriptada no banco de dados
userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

//Gera e insere o token
userSchema.methods.getResetPasswordToken = function() {
  //Generate the token
  const resetToken = crypto.randomBytes(20).toString('hex');

  //Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  //Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
  return resetToken;

}

function validaCPF() {
  return cpf.isValid(this.cpf);
}

module.exports = mongoose.model('User', userSchema);