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

const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')

app.use('/', loginRouter)
app.use('/user', userRouter)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
