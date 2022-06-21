const db = require('../config/database')
const ErrorResponse = require('../utils/ErrorResponse')


const getAllUser = () => {
   return new Promise((resolve, reject) => {
      db.query('SELECT id, name, email, phone, photo FROM users', (err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}


const getUserById = (id) => {
   return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE id=$1', [id], (err, result) => {
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
   const { id, name, email, password, phone, photo } = user

   return new Promise((resolve, reject) => {
      db.query('UPDATE users SET name=$1, email=$2, password=$3, phone=$4, photo=$5 WHERE id=$6',
      [name, email, password, phone, photo, id],(err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}


const destroy = (id) => {
   return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id=$1', [id], (err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}


module.exports = { create, update, destroy, getAllUser, getUserById }