const db = require('../config/database')
const ErrorResponse = require('../utils/ErrorResponse')


const findAll = () => {
   return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}


const findById = (id) => {
   return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE user_id=$1', [id], (err, result) => {
         if(err) return reject(err)
         if(result.rowCount) return resolve(result)

         reject(new ErrorResponse('User Not Found', 404))
      })
   })
}

const findByEmail = (email) => {
   return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE email=$1', [email], (err, result) => {
         if(err) return reject(err)
         if(result.rowCount) return resolve(result)

         reject(new ErrorResponse('User Not Found', 404))
      })
   })
}

const create = (user) => {
   const { name, email, password, phone } = user

   return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (name,email,password,phone) VALUES ($1,$2,$3,$4)',
      [name, email, password, phone],(err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}


const update = (user) => {
   const { id, name, email, password, phone, avatar } = user

   return new Promise((resolve, reject) => {
      db.query('UPDATE users SET name=$1, email=$2, password=$3, phone=$4, avatar=$5 WHERE user_id=$6',
      [name, email, password, phone, avatar, id],(err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}


const destroy = (id) => {
   return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE user_id=$1', [id], (err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}


module.exports = { create, update, destroy, findAll, findById, findByEmail }