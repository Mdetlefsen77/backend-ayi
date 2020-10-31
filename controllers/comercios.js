const {Comercio} = require("../db/models/index");


//---------------------------INDEX--------------------------------//

    const index = async (req, res) => {
        const {skip, limit} = req.query
       // populate('Shopping')
        try {
    
            const count = await Comercio.countDocuments()
            const resultado = await Comercio.find().skip(parseInt(skip)).limit(parseInt(limit))
        
            console.log(resultado);
            return res.status(200).send
    
                ({
                    count,
                    comercios:resultado
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
  
      const comercioCreated = await new Comercio(params);
      comercioCreated.save();
      return res.status(200).send(comercioCreated);
    } catch (e) {
      console.log(e);
      return res.status(500).send({error: "Error al crear el comercio, intente nuevamente"});
    }
  };


//---------------------------UPDATE--------------------------------//



    const update = async(req, res) => {

        const {comercioId} = req.params;
    
        const params = prepareDataForUpdate(req.body);

        try{
            const resultado = await Comercio.findOneAndUpdate(
                {_id:comercioId},
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
    const {comercioId} = req.params;

    try{
         await Comercio.findOneAndDelete(
            {_id:comercioId})
        
        
        return res.status(200).send('Dato Removido')
    }
    catch(e)
        {
            return res.status(500).send({error: 'Error removiendo datos'});
        }
}
   



//---------------------------SHOW--------------------------------//

const show = async(req, res) => {

    const {comercioId} = req.params;
    try {

        const resultado = await Comercio.findOne({_id:comercioId});
    
        console.log(resultado);
        return res.status(200).send(resultado);

    }catch(e){

        return res.status(500).send({error: 'Error en la busqueda'});
    }
}

const prepareDataForUpdate = (body) => {

    const params = {}
    if (body.nombre) params['nombre'] = body.nombre;
    if (body.manager) params['manager'] = body.manager;
    if (body.cuit) params['cuit'] = body.cuit;
    if (body.location) params['location'] = body.location;

    return params;
}

module.exports = {index, create, update, remove, show};

               