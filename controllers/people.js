const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Person = require('../models/person');
const Relationship = require('../models/relationship');

//@desc   Retorna todos as pessoas
//@route  GET /people
//@access Private
exports.getPeople = asyncHandler( async (req, res, next) => {

  res.status(200).json(res.advancedResults);
 
});

//@desc   Retorna somente 1 pessoa
//@route  GET /people/:id
//@access Private
exports.getPerson = asyncHandler(async (req, res, next) => {
 
  const person = await Person.findById(req.params.id);
  if(!person){
    return next(new ErrorResponse(`Pessoa de ID: ${req.params.id} não foi encontrada`, 404));
  }
  res.status(200).json({success: true, data: person});
  
});

//@desc   Cria uma nova pessoa
//@route  POST /people
//@access Private
exports.createPerson = asyncHandler(async (req, res, next) => {  
   
  const person = await Person.create(req.body);
  res.status(201).json({
    success: true,
    data: person
 }); 
 
});

//@desc   Atualiza pessoas
//@route  PUT /people/:id
//@access Private
exports.updatePerson = asyncHandler(async (req, res, next) => {
  
  let person = await Person.findById(req.params.id);

  if(!person){
    return next(new ErrorResponse(`Pessoa de ID: ${req.params.id} não foi encontrada`, 404));
  }  

  person = await Person.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    runValidators: true
  });
  
  res.status(200).json({success: true, data: person});
  
});

//@desc   Remove pessoa
//@route  DELETE /api/v1/people
//@access Private
exports.deletePerson = asyncHandler(async (req, res, next) =>{
  
  let person = await Person.findById(req.params.id);
  if(!person){
    return next(new ErrorResponse(`Não existe pessoa com o ID ${req.params.id}`, 404));
  }

  let relationship = await Relationship.find({ $or: [{'person1': req.params.id}, {'person2': req.params.id}]});

  if(relationship.length){
    relationship.forEach(async (item)=>{
      await Relationship.findByIdAndRemove(item._id);
    })
  }

  await Person.remove(person);
  
  res.status(200).json({success: true, data: {}
  });
});