const mongoose = require('mongoose');
const pointSchema = require('./index');
const User = require('./User');

let comercioSchema = new mongoose.Schema({

    nombre:{
        type: String,
        require: true,
    },
    manager:{
        type: String,
        require: true,
        ref: 'User',
    },
    cuit:{
        type:Number,
        require: true,
        unique: true,
    },
    location: {
        type: pointSchema,
        require: true,
    },
   comercios:[
       {
           type:mongoose.Types.ObjectId,
           ref:('Shopping')

       }
   ]
},
{
    timestamps:true,
    collection:'comercios',
}
)


const Comercio = mongoose.model('Comercio', comercioSchema);

module.exports = Comercio;
