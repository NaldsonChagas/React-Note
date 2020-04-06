const { withJWTAuthMiddleware } = require('express-kun')

function protectedRouter (expressRouter) {
  return withJWTAuthMiddleware(expressRouter,
    process.env.LOGIN_KEY)
}

module.exports = protectedRouter
