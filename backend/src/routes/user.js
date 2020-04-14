const express = require('express')
const router = express.Router()

const userController = require('../controllers/UserController')

const protectedRouter = require('../utils/protectedRouter')(router)

const checkUserPassword = require('../midlewares/CheckUserPassword')

router.post('/', userController.save)

router.use('/', checkUserPassword)

protectedRouter.put('/', userController.update)
protectedRouter.delete('/', userController.delete)

module.exports = router
