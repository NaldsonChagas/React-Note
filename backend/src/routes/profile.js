const express = require('express')
const router = express.Router()

const protectedRouter = require('../utils/protectedRouter')(router)

const profileController = require('../controllers/ProfileController')

protectedRouter.get('/', profileController.profile)

module.exports = router
