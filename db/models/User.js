const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//-----------------ESQUEMA DE USUARIO


let userSchema = new mongoose.Schema(
{
    nombre: 
           {
            type: String,
            required: true,  
           },
    apellido: 
           {
            type:String,
            required:true,
           },
    password: 
           {
            type: String,
            required:true,
           },
    email: 
           {
            type:String,
            unique:true,
            required:true,
           },
    documento: 
           {
            type:Number,
            unique:true,
            required:true,
           },
    fec_nac:
           {
            type: Date,
           }, 
    sexo:
           {
            type:String,
            enum: ['MASCULINO', 'FEMENINO']
           },       
    role:
           {
            type:String,
            enum:['ADMIN','SHOPPING_MANAGER','COMMERCE_MANAGER','USER'],
            default:'USER'
           },
                    
                
        
},           

    {
    timestamps:true,
    collection:'usuarios',
    }
)

//-----------------ESQUEMA PRE SAVE

  userSchema.pre('save', async function(next) {
    try {
    const user = this;
  
    if (user.isModified('password')) {
     user.password = await bcrypt.hash(user.password, 8);
    }
    }catch(e){
        return res.status(500).send('No se pudo encriptar la clave')
    }
    next();
  });

  //---------------ESQUEMA PRE UPDATE

userSchema.pre('findOneAndUpdate', async function (next) {
    console.log(this.getUpdate());
    const {password} = this.getUpdate();
    if (password) 
    {
      this._update.password = await bcrypt.hashSync(this._update.password, 10);
    }
    next();
  });  
 
  //---------------METODO GET FULL NAME
userSchema.methods.getFullName = function () {
return `${this.nombre} ${this.apellido}`
}



const User = mongoose.model('User', userSchema);
module.exports = User;

