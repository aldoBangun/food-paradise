const { Pool, Client } = require('pg')
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DATABASE, DATABASE_URL } = process.env

let connection

if (process.env.NODE_ENV === 'production') {
  connection = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  })
} else {
  connection = new Pool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE
  })
}

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
