const {Shopping} = require('../db/models/index');


//---------------------------INDEX--------------------------------//

const index = async (req, res) => {
    const {skip, limit} = req.query
    try {

        const count = await Shopping.countDocuments()
        const resultado = await Shopping.find().skip(parseInt(skip)).limit(parseInt(limit))
    
        console.log(resultado);
        return res.status(200).send

            ({
                count,
                shoppings:resultado
            });

    }catch(e)
            {
            return res.status(500).send({error: 'Error en la busqueda'});
            }

}




//---------------------------CREATE--------------------------------//

const create = async (req, res) => {


    try {
      const params = prepareDataForUpdate(req.body)
  
      const shoppingCreated = await new Shopping(params);
      shoppingCreated.save();
      return res.status(200).send(shoppingCreated);
    } catch (e) {
      console.log(e);
      return res.status(500).send({error: "Error al crear el shopping, intente nuevamente"});
    }
  };


//---------------------------UPDATE--------------------------------//



const update = async(req, res) => {

    const {shoppingId} = req.params;

    const params = prepareDataForUpdate(req.body);
    
    try{
        const resultado = await Shopping.findOneAndUpdate(
            {_id:shoppingId},
            {...req.body},
            {new:true}
        
            
            )
        
        console.log(resultado)
        return res.status(200).send(resultado)
    }catch(e)
    {
        return res.status(500).send({error: 'Error Actualizando datos'});
    }
}




//---------------------------REMOVE--------------------------------//

const remove = async(req, res) => {
const {shoppingId} = req.params;

try{
     await Shopping.findOneAndDelete(
        {_id:shoppingId})
    
    
    return res.status(200).send('Dato Removido')
}
catch(e)
    {
        console.log(e)
        return res.status(500).send({error: 'Error removiendo datos'});
    }
}




//---------------------------SHOW--------------------------------//

const show = async(req, res) => {

const {shoppingId} = req.params;
try {

    const resultado = await Shopping.findOne({_id:shoppingId});

    console.log(resultado);
    return res.status(200).send(resultado);

}catch(e){

    return res.status(500).send({error: 'Error en la busqueda'});
}
}

const prepareDataForUpdate = (body) => {
    const params = {};
    if (body.nombre) params['nombre'] = body.nombre;
    if (body.manager) params['manager'] = body.manager;
    if (body.cuit) params['cuit'] = body.cuit;
    if (location) params['location'] = body.location;

    return params;
  }

module.exports = {index, create, update, remove, show};

  