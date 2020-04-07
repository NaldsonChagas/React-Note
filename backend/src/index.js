require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json())

const connection = require('./database/config')

connection
  .authenticate()
  .then((result) => console.log('Connection with db ok'))
  .catch((err) => console.log(err))

require('./database/models/User')
require('./database/models/Note')

const checkLoggedUser = require('./midlewares/CheckLoggedUser')

app.use(checkLoggedUser)

const noteRouter = require('./routes/note')
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const profileRouter = require('./routes/profile')
const validatorRouter = require('./routes/validator')

app.use('/', loginRouter)
app.use('/note', noteRouter)
app.use('/user', userRouter)
app.use('/profile', profileRouter)
app.use('/validator', validatorRouter)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
