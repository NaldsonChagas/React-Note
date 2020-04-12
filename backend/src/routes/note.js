const express = require('express')
const router = express.Router()

const protectedRouter = require('../utils/protectedRouter')(router)

const noteController = require('../controllers/NoteController')

protectedRouter.get('/', noteController.index)
protectedRouter.post('/', noteController.save)
protectedRouter.put('/', noteController.update)

module.exports = router
