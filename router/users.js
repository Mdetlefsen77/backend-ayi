const express = require('express');
const userRouter = express.Router();
const  {index, create, update, remove, show} = require('../controllers/users.js');
const validateMiddleware = require('../validations/v-users')



//ID
userRouter.get('/', index);

//CREATE
userRouter.post('/create', validateMiddleware.create, create);

//UPDATE
userRouter.put('/:userId', update);

//DELETE
userRouter.delete('/:userId', remove);

//SHOW
userRouter.get('/:userId', show);


module.exports = userRouter;