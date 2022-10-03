const db = require('../config/database')
const ErrorResponse = require('../utils/ErrorResponse')

exports.create = ({ recipeId, userId }) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO liked_recipe(recipe_id, user_id) VALUES($1, $2) RETURNING *',
      [recipeId, userId], (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

exports.findByRecipeAndUser = ({ recipeId, userId }) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM liked_recipe WHERE recipe_id=$1 AND user_id=$2',
      [recipeId, userId], (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM liked_recipe', (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

exports.findById = (likeId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM liked_recipe WHERE liked_id = $1', [likeId], (err, result) => {
      if (err) return reject(err)
      if (result.rowCount) return resolve(result)

      reject(new ErrorResponse('Like data not found', 404))
    })
  })
}

exports.findByRecipeId = (recipeId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM liked_recipe WHERE recipe_id = $1', [recipeId], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

exports.findByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM liked_recipe WHERE user_id = $1', [userId], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

exports.destroy = (likedId) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM liked_recipe WHERE liked_id=$1', [likedId], (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}
