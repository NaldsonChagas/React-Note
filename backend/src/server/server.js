const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())
app.use(express.json())

const checkLoggedUser = require('../midlewares/CheckLoggedUser')

app.use(checkLoggedUser)

const noteRouter = require('../routes/note')
const userRouter = require('../routes/user')
const loginRouter = require('../routes/login')
const profileRouter = require('../routes/profile')
const validatorRouter = require('../routes/validator')

app.get('/', (req, res) => {
  res.json({ message: 'React app API' })
})
app.use('/', loginRouter)
app.use('/note', noteRouter)
app.use('/user', userRouter)
app.use('/profile', profileRouter)
app.use('/validator', validatorRouter)

module.exports = app