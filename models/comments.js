const db = require('../config/database')
const ErrorResponse = require('../utils/ErrorResponse')

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM comments INNER JOIN users ON comments.user_id=users.user_id INNER JOIN recipes ON comments.recipe_id=recipes.recipe_id',
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

const findById = (id) => {
  const query = 'SELECT * FROM comments INNER JOIN users ON comments.user_id=users.user_id INNER JOIN recipes ON comments.recipe_id=recipes.recipe_id WHERE comment_id=$1'

  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) return reject(err)
      if (result.rowCount) return resolve(result)

      reject(new ErrorResponse('Comment not found'), 404)
    })
  })
}

const findByRecipeId = (id) => {
  const query = 'SELECT * FROM comments INNER JOIN users ON comments.user_id=users.user_id INNER JOIN recipes ON comments.recipe_id=recipes.recipe_id WHERE comments.recipe_id=$1 ORDER BY comment_id DESC'

  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) return reject(err)
      if (result.rowCount) return resolve(result)

      reject(new ErrorResponse('Recipe not found', 404))
    })
  })
}

const create = (comment) => {
  const { message, userId, recipeId } = comment

  return new Promise((resolve, reject) => {
    db.query('INSERT INTO comments (message, user_id, recipe_id) VALUES ($1, $2, $3)',
      [message, userId, recipeId], (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

const update = (comment) => {
  const { id, message } = comment

  return new Promise((resolve, reject) => {
    db.query('UPDATE comments SET message=$1 WHERE comment_id=$2', [message, id], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const destroy = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM comments WHERE comment_id=$1', [id], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

module.exports = { create, update, destroy, findById, findByRecipeId, findAll }
