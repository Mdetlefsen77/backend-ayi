const express = require('express');
const shoppingRouter = express.Router();
const {index, create, update, remove, show} = require('../controllers/shoppings.js');

//ID
shoppingRouter.get('/', index);

//CREATE
shoppingRouter.post('/create',  create);

//UPDATE
shoppingRouter.put('/:shoppingId', update);

//DELETE
shoppingRouter.delete('/:shoppingId', remove);

//SHOW
shoppingRouter.get('/:shoppingId', show);


module.exports = shoppingRouter;


