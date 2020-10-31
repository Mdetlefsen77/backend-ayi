function checkRoles(rolesArray) {
    return function (req, res, next) {
      const found = rolesArray.find((role) => req.user.role === role);
      if (found) {
        return next();
      }
      return res.status(401).send({code: 'unathorized', msg: 'Usuario no autorizado'});
    }
  }
  
  
  module.exports = {checkRoles};
  