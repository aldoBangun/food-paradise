const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const path = require('path')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const createStatic = require('./utils/createStatic')
const PORT = process.env.PORT || 5000
// const corsOptionsDelegate = require('./config/cors')

const notFound = require('./routes/notFound')
const errorHandler = require('./middleware/errorHandler')
const routeAuth = require('./routes/auth')
const routeUsers = require('./routes/users')
const routeRecipes = require('./routes/recipes')
const routeComments = require('./routes/comments')
const routeLikes = require('./routes/likes')

createStatic()

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(cors())
// app.use(cors(corsOptionsDelegate))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/auth', routeAuth)
app.use('/users', routeUsers)
app.use('/recipes', routeRecipes)
app.use('/comments', routeComments)
app.use('/likes', routeLikes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App is running on port:${PORT}`)
})
