'use strict'

const {User} = require('../db/models/index')
const bcrypt = require('bcrypt');
const jwt = require('../db/config/jwt')

const login = async (req, res) => {
    const {password, email} = req.body;

    try{
                //trae usuarios con email : Email : Any
        const findUser = await User.findOne({email: email})
                // si no esta 
        if(!findUser){
        return res.status(404).send ('User Not found')
        }
                // imprimime el user
        console.log(findUser);
                //comparame el password con password
        if(bcrypt.compareSync(password, findUser.password)){
            const token = jwt.sign(findUser); //traeme el token y validame
            return res.status(200).send ({token: token}); 

            //no es valido
        }else {
            return res.status(401).send('Contraseña Invalida')

        }
    //No funca directamente :'S
    }catch(e){
        return res.status(500).send('Login Error')
    }
}

module.exports = {
    login
}

