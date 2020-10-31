require("dotenv").config();

// LIBRERIAS}
const express = require('express');
const app = express();
const http = require('http');
const joi = require('express');
const logger = require("morgan");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



//------------------DB
const mongoose = require('./db/config/mongo.js')

//-----------------RUTAS
const userRouter = require('./router/users.js');
const comercioRouter = require('./router/comercios.js');  
const shoppingRouter = require('./router/shoppings.js');
const authRouter = require('./router/auth.js')
const authMiddleware = require('./middlewares/auth');
const rolesMiddleware = require('./middlewares/roles')

//-----------------MIDDLEWARE
app.use('/users', authMiddleware.isAuth,rolesMiddleware.checkRoles(['ADMIN']), userRouter);
app.use('/shoppings',authMiddleware.isAuth, shoppingRouter);
app.use('/comercios', authMiddleware.isAuth,comercioRouter);
app.use('/auth', authRouter);

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(bodyParser.json());

//PORT

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Server is listening on port: ${port}`));

//ERROR 404
app.use((req, res) => {
    res.status(404).send("Error al conectar con el puerto ")
})

module.exports = app;


