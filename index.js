const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT || 8000
const notFound = require('./routes/notFound')
const errorHandler = require('./middleware/errorHandler')
const routeUsers = require('./routes/users')

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/users', routeUsers)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=> {
   console.log(`App is running on http://localhost:${PORT}`)
})