const jwt = require('jsonwebtoken');


const sign = (user) => {
  try {
    return jwt.sign({
      user: user
    }, process.env.SECRET_KEY,{expiresIn: '1h'});
  } catch (e) {
    throw new Error('error_jwt')
  }
}

const verify = (token) => {

  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (e) {
    throw new Error('error_jwt')
  }

};

module.exports = {
  sign,
  verify
}
