const Joi = require('joi');

const login = async (req, res, next) => {
  const schema =Joi.object
  ({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        
  })
        console.log(schema);
        const params = req.body;

            try {
                await schema.validateAsync(params)
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

module.exports = {login};
