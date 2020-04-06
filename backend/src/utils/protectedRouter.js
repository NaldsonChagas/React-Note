const { withJWTAuthMiddleware } = require('express-kun')

const express = require('express')
const router = express.Router()

const protectedRouter = withJWTAuthMiddleware(router,
  process.env.Router)

module.exports = protectedRouter
