const db = require('../config/database')
const ErrorResponse = require('../utils/ErrorResponse')


const findById = (id) => {
   const query = 'SELECT * FROM comments INNER JOIN comments.user_id=users.user_id INNER JOIN comments.recipe_id=recipes.recipe_id WHERE comment_id=$1'

   return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
         if(err) return reject(err)
         if(result.rowCount) return resolve(result)

         reject(new ErrorResponse('Comment not found'), 404)
      })
   })
}

const findByRecipeId = (id) => {
   const query = 'SELECT * FROM comments INNER JOIN comments.user_id=users.user_id INNER JOIN comments.recipe_id=recipes.recipe_id WHERE recipe_id=$1'

   return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}

const create = (comment) => {
   const { message, user_id, recipe_id } = comment

   return new Promise((resolve, reject) => {
      db.query('INSERT INTO comments (message, user_id, recipe_id) VALUES ($1, $2, $3)',
      [message, user_id, recipe_id],(err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}

const update = (comment) => {
   const { id, message } = comment

   return new Promise((resolve, reject) => {
      db.query('UPDATE comments SET message=$1 WHERE comment_id=$2',[message, id], (err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}

const destroy = (id) => {
   return new Promise((resolve, reject) => {
      db.query('DELETE FROM comments WHERE comment_id=$1', [id], (err, result) => {
         if(err) return reject(err)
         resolve(result)
      })
   })
}


module.exports = { create, update, destroy, findById, findByRecipeId }