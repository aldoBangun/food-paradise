const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 8000

require('./config/database')

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(PORT, ()=> {
   console.log(`App is running on http://localhost:${PORT}`)
})