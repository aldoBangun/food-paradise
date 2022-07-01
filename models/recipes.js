const db = require('../config/database')
const ErrorResponse = require('../utils/ErrorResponse')

const findAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes INNER JOIN users ON recipes.user_id=users.user_id',
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

const findById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes INNER JOIN users ON recipes.user_id=users.user_id WHERE recipe_id=$1',
      [id], (err, result) => {
        if (err) return reject(err)
        if (result.rowCount) resolve(result)

        reject(new ErrorResponse('Recipe Not Found', 404))
      })
  })
}

const findByUsername = (name) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes INNER JOIN users ON recipes.user_id=users.user_id WHERE name LIKE $1',
      [`%${name}%`], (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

const findByTitle = (title) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes INNER JOIN users ON recipes.user_id=users.user_id WHERE title LIKE $1',
      [`%${title}%`], (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

const findLatest = (limit) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes ORDER BY created_at DESC LIMIT $1', [limit], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const findByPage = (limit, page) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM recipes LIMIT $1 OFFSET $2', [limit, page], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

const create = (recipe) => {
  const { title, ingredients, photo, videos, createdAt, userId } = recipe

  return new Promise((resolve, reject) => {
    db.query('INSERT INTO recipes (title, ingredients, photo, videos, created_at, user_id) VALUES ($1,$2,$3,$4,$5,$6)',
      [title, ingredients, photo, videos, createdAt, userId],
      (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

const update = (recipe) => {
  const { id, title, ingredients, photo, videos } = recipe

  return new Promise((resolve, reject) => {
    db.query('UPDATE recipes SET title=$1, ingredients=$2, photo=$3, videos=$4 WHERE recipe_id=$5',
      [title, ingredients, photo, videos, id], (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
  })
}

const destroy = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM recipes WHERE recipe_id=$1', [id], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

module.exports = { create, update, destroy, findAll, findById, findByUsername, findLatest, findByTitle, findByPage }
