const jwt = require('jsonwebtoken')

module.exports = function checkLoggedUser (req, res, next) {
  let { authorization, userid } = req.headers
  if (authorization && userid) {
    authorization = authorization.split(' ')[1]
    const { userFinded } = jwt.verify(authorization, process.env.LOGIN_KEY)

    if (userFinded.id !== parseInt(userid)) {
      res.status(403).json({ message: 'You are not authorized to access this page' })
    } else {
      next()
    }
  } else {
    next()
  }
}
