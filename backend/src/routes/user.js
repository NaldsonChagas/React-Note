const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')

const protectedRouter = require('../utils/protectedRouter')(router)

router.post('/', userController.save)
protectedRouter.delete('/', userController.delete)

module.exports = router
