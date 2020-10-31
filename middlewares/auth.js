
const moment = require('moment');
const jwt = require('../db/config/jwt');

const isAuth = (req, res, next) => {
    if (!req.headers || !req.headers.authorization)
        {
        return res.status(401).send({code: 'no_token', msg: 'Token inexistente'});
        } 
        const token = req.headers.authorization.replace('bearer', '');
        const tokenDecoded = jwt.verify(token);

        const now = 
            {
            iat: moment().unix(),
            }
        const expired =
            {
            exp: moment().add(30, 'days')
            }
            tokenDecoded.expired
    if(expired <= now)
        {
        return res.status(401).send({code: 'token_expired', msg: 'Token expirado'}); 
        }
    req.user = tokenDecoded.user;
    next();
}
module.exports = {
    isAuth
}

 



//------------------------------------------------------------------------------------





