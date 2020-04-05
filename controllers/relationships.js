const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Relationship = require('../models/relationship');
const Relation = require('../models/relation');
const Person = require('../models/person');



//@desc   Retorna todos os relacionamentos
//@route  GET //api/v1/people/:personId/relationships
//@access Private
exports.getRelationships = asyncHandler( async (req, res, next) => {
  
  if(req.params.personId){
    const relationships = await Relationship.find({ $or: [{'person1': req.params.personId}, {'person2': req.params.personId}]});

    return res.status(200).json({
      success: true,
      count: relationships.length,
      data: relationships
    });
  } else {
  res.status(200).json(res.advancedResults);
  }
 
});

//@desc   Retorna somente 1 relacionamento
//@route  GET /api/v1/relationships/:id
//@access Private
exports.getRelationship = asyncHandler(async (req, res, next) => {
 
  const relationship = await Relationship.findById(req.params.id);
  if(!relationship){
    return next(new ErrorResponse(`Relacionamento de ID: ${req.params.id} não foi encontrado`, 404));
  }
  res.status(200).json({success: true, data: relationship});
  
});

//@desc   Cria um novo relacionamento
//@route  POST /api/v1/relationships
//@access Private
exports.createRelationship = asyncHandler(async (req, res, next) => {  
  
  let person1 = await Person.findById(req.body.person1);

  if(!person1){
    return next(new ErrorResponse(`Pessoa1 de ID: ${req.body.person1} não foi encontrada`, 404));
  }

  let person2 = await Person.findById(req.body.person2);

  if(!person2){
    return next(new ErrorResponse(`Pessoa2 de ID: ${req.body.person2} não foi encontrada`, 404));
  }

  let relation = await Relation.findById(req.body.relation);

  if(!relation){
    return next(new ErrorResponse(`Relação de ID: ${req.body.relation} não foi encontrada`, 404));
  }

  person1.toObject();
  console.log(person1);
  person2.toObject();
  console.log(person2);
  relation.toObject();
  console.log(relation);

  req.body.relationship1 = person1.name + ' ' + relation.relation1 + ' ' + person2.name;
  req.body.relationship2 = person2.name + ' ' + relation.relation2 + ' ' + person1.name;

  const relationship = await Relationship.create(req.body);
  res.status(201).json({
    success: true,
    data: relationship
 }); 
 
});

//@desc   Atualiza relacioonamentos
//@route  PUT api/v1/relationships/:id
//@access Private
exports.updateRelationship = asyncHandler(async (req, res, next) => {
  
  let relationship = await Relationship.findById(req.params.id);

  if(!relationship){
    return next(new ErrorResponse(`Relacionamento de ID: ${req.params.id} não foi encontrado`, 404));
  }  

  let person1 = await Person.findById(req.body.person1);

  if(!person1){
    return next(new ErrorResponse(`Pessoa1 de ID: ${req.body.person1} não foi encontrada`, 404));
  }

  let person2 = await Person.findById(req.body.person2);

  if(!person2){
    return next(new ErrorResponse(`Pessoa2 de ID: ${req.body.person2} não foi encontrada`, 404));
  }

  let relation = await Relation.findById(req.body.relation);

  if(!relation){
    return next(new ErrorResponse(`Relação de ID: ${req.body.relation} não foi encontrada`, 404));
  }

  person1.toObject();
  console.log(person1);
  person2.toObject();
  console.log(person2);
  relation.toObject();
  console.log(relation);

  req.body.relationship1 = person1.name + ' ' + relation.relation1 + ' ' + person2.name;
  req.body.relationship2 = person2.name + ' ' + relation.relation2 + ' ' + person1.name;

  relationship = await Relationship.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    runValidators: true
  });
  
  res.status(200).json({success: true, data: relationship});
  
});

//@desc   Remove relacionamento
//@route  DELETE /api/v1/relationship/:id
//@access Private
exports.deleteRelationship = asyncHandler(async (req, res, next) =>{
  await Relationship.findByIdAndDelete(req.params.id);

  res.status(200).json({success: true, data: {}
  });
});