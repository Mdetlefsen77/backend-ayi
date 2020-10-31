const express = require('express');
const comercioRouter = express.Router();
const {index, create, update, remove, show} = require('../controllers/comercios.js');


//ID
comercioRouter.get('/', index);

//CREATE
comercioRouter.post('/create', create);

//UPDATE
comercioRouter.put('/:comercioId', update);

//DELETE
comercioRouter.delete('/:comercioId', remove);

//SHOW
comercioRouter.get('/:comercioId', show);


module.exports = comercioRouter;