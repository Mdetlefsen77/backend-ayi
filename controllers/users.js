const {User} = require ("../db/models/index")



//---------------------------INDEX--------------------------------//

const index = async (req, res) => {
    const {skip, limit, } = req.query
    
 

    try {

        const count = await User.countDocuments()
        const resultado = await User.find().skip(parseInt(skip)).limit(parseInt(limit))
    
        console.log(resultado);
        return res.status(200).send

            ({
                count,
                usuarios:resultado
            });

    }catch(e){

        return res.status(500).send({error: 'Error en la busqueda'});

    }
}

//---------------------------CREATE--------------------------------//
const create = async (req, res) => {


    try {
      const params = prepareDataForUpdate(req.body)
  
      const userCreated = await new User(params);
      userCreated.save();
      return res.status(200).send(userCreated);
    } catch (e) {
      console.log(e);
      return res.status(500).send({error: "Error al crear el usuario, intente nuevamente"});
    }
  };
  

//---------------------------UPDATE--------------------------------//

const update = async(req, res) => {

    const {userId} = req.params;

    const params = prepareDataForUpdate(req.body);
    
    
    try{
        const resultado = await User.findOneAndUpdate(
            {_id:userId},
            {...req.body},
            {new:true}
            )
        
        
        return res.status(200).send(resultado)
    }catch(e)
    {
        return res.status(500).send({error: 'Error Actualizando datos'});
    }
}

//---------------------------REMOVE--------------------------------//

const remove = async(req, res) => {
    const {userId} = req.params;

    try{
        await User.findOneAndDelete(
            {_id:userId})
        
        
        return res.status(200).send('Dato Removido')
        }catch(e)
    {
        console.log(e)
        return res.status(500).send({error: 'Error removiendo datos'});
    }
}
   


//---------------------------SHOW--------------------------------//

const show = async(req, res) => {

    const {userId} = req.params;
    try {

        const resultado = await User.findOne({_id:userId});
    
        console.log(resultado);
        return res.status(200).send(resultado);

    }catch(e){

        return res.status(500).send({error: 'Error en la busqueda'});
    }
}


const prepareDataForUpdate = (body) => {
    const params = {};
    if (body.nombre) params['nombre'] = body.nombre;
    if (body.apellido) params['apellido'] = body.apellido;
    if (body.documento) params['documento'] = body.documento;
    if (body.fec_nac) params['fec_nac'] = body.fec_nac;
    if (body.sexo) params['sexo'] = body.sexo;
    if (body.role) params['role'] = body.role;
    if (body.email) params['email'] = body.email;
    if (body.password) params['password'] = body.password
  
    return params;
  }
  
  
  

module.exports = {index, create, update, remove, show};


