const express = require('express')
const router = express.Router()

const protectedRouter = require('../utils/protectedRouter')(router)

const checksNoteAuthorship = require('../midlewares/ChecksNoteAuthorship')

const noteController = require('../controllers/NoteController')

protectedRouter.get('/', noteController.index)
protectedRouter.post('/', noteController.save)

router.use('/:id', checksNoteAuthorship)

protectedRouter.put('/:id', noteController.update)
protectedRouter.delete('/:id', noteController.delete)

module.exports = router
