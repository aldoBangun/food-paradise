const { Pool } = require('pg')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DATABASE } = process.env

const connection = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DATABASE
})

const connect = async () => {
  try {
    const response = await connection.connect()
    if (response) console.log('Database Connected')
  } catch (err) {
    console.log(err)
  }
}

connect()

module.exports = connection
