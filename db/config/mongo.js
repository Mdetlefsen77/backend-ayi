// mongo conect client
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {useNewUrlParser:true, useCreateIndex:true,useFindAndModify:false,useCreateIndex:true});
const db = mongoose.connection;

db.on("error",console.error.bind(console,"Error de conexion"));
db.once("open",() =>{
    console.log("Database is opening")
})

module.exports = mongoose;