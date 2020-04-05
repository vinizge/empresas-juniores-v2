const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Relation = require('../models/relation');

//@desc   Retorna todas relações
//@route  GET /api/v1/relations
//@access Private
exports.getRelations = asyncHandler( async (req, res, next) => {

  res.status(200).json(res.advancedResults);
 
});

//@desc   Retorna somente 1 relação
//@route  GET /api/v1/relations/:id
//@access Private
exports.getRelation = asyncHandler(async (req, res, next) => {
 
  const relation = await Relation.findById(req.params.id);
  if(!relation){
    return next(new ErrorResponse(`Relação de ID: ${req.params.id} não foi encontrada`, 404));
  }
  res.status(200).json({success: true, data: relation});
  
});

//@desc   Cria uma nova relação
//@route  POST /api/v1/relations
//@access Private
exports.createRelation = asyncHandler(async (req, res, next) => {  
   
  const relation = await Relation.create(req.body);
  res.status(201).json({
    success: true,
    data: relation
 }); 
 
});

//@desc   Atualiza relações
//@route  PUT /api/v1/relations/:id
//@access Private
exports.updateRelation = asyncHandler(async (req, res, next) => {
  
  let relation = await Relation.findById(req.params.id);

  if(!relation){
    return next(new ErrorResponse(`Relação de ID: ${req.params.id} não foi encontrada`, 404));
  } 

  relation = await Relation.findByIdAndUpdate(req.params.id, req.body,{
    new: true,
    runValidators: true
  });  
  
  res.status(200).json({success: true, data: relation});
  
});

//@desc   Remove relação
//@route  DELETE /api/v1/relations
//@access Private
exports.deleteRelation = asyncHandler(async (req, res, next) =>{
  let relation = await Relation.findById(req.params.id);
  
  if(!relation){
    return next(new ErrorResponse(`Não existe relação com o ID ${req.params.id}`, 404));
  }

  const relationship = await Relationship.find({relation: relation._id});
   

  if(relationship.length){
    return next(new ErrorResponse(`Existe um relacionamento utilizando esta relação, por favor exclua o mesmo antes de excluir está relação`, 403));
  }

 await Relation.remove(relation);
 
  res.status(200).json({success: true, data: {}
  });
});