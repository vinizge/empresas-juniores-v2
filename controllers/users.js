const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/users');

//@desc   Retorna todos os usuários
//@route  GET /usuarios
//@access Private
exports.getUsers = asyncHandler( async (req, res, next) => {

  res.status(200).json(res.advancedResults);
 
});

//@desc   Retorna somente 1 usuário
//@route  GET /usuarios/:id
//@access Private
exports.getUser = asyncHandler(async (req, res, next) => {
 
  const user = await User.findById(req.params.id);
  if(!user){
    return next(new ErrorResponse(`Usuário de ID: ${req.params.id} não foi encontrado`, 404));
  }
  res.status(200).json({success: true, data: user});
  
});

//@desc   Cria um novo usuário
//@route  POST /usuarios
//@access Private
exports.createUser = asyncHandler(async (req, res, next) => {  
   
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user
 }); 
 
});

//@desc   Atualiza usuários
//@route  PUT /usuarios/:id
//@access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  
  let user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorResponse(`Usuário de ID: ${req.params.id} não foi encontrado`, 404));
  }  

  user = await User.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    runValidators: true
  });
  
  res.status(200).json({success: true, data: user});
  
});