const express = require('express')
const router = express.Router()

const validatorController = require('../controllers/ValidatorController')

router.get('/:type/:value', validatorController
  .usernameAndEmailAvailability)

module.exports = router
