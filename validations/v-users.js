const Joi = require('joi');

const create = async (req, res, next) => {
  const schema =Joi.object
  ({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        password:Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        sexo: Joi.string().required(),
        documento: Joi.required(),
        
  })
        console.log(schema);
        const params = req.body;

            try {
                const resultado = await schema.validateAsync(params)
                console.log(resultado)
                next();
            }catch (e) 
            {
                if(e.details && e.details.length > 0) {
                    const errors = e.details.map(detailsError => detailsError.message).join(', ');
                    return res.status(500).send(errors);
                }
                console.log(e)
                return res.status(500).send('Error al validar los datos');
            }
                
        

}

module.exports = {create};



  