const mongoose = require('mongoose');
const pointSchema = require('./index');

let shoppingSchema = new mongoose.Schema(
{

    nombre: {  
        type: String,
        required: true,  
    },

    location: { 
        type: pointSchema,
        required:true,
    },
    
    cuit: { 
        type: Number,
        required: true,
        unique: true,
    },
    manager: {
        type:String,
        required: true,
        ref:'User'
        
    },
    shoppings: [{
        type:mongoose.Types.ObjectId,
        ref:'Comercio'
    }]
   
    
},
    { 
    timestamps:true,
    collection: 'shoppings',
    }
)


const Shopping = mongoose.model('Shopping', shoppingSchema);

module.exports = Shopping;
