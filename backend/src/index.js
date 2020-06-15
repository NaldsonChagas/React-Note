require('dotenv').config()

process.on('SIGINT', () => {
  connection.close().then(() => {
    console.log('All database connection will be closed')
    process.exit()
  })
})

process.on('exit', () => {
  console.log('Exiting application')
})

const port = process.env.PORT

const app = require('./server/server')

app.listen(port, () => console.log(`Server is listening on port ${port}`))
