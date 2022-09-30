const { findById: findRecipe } = require('../models/recipes')
const { findById: findUser } = require('../models/users')
const { create, findAll, findById, findByRecipeId, findByUserId, destroy } = require('../models/likeRecipe')
const asyncHandler = require('../middleware/asyncHandler')

exports.createLike = asyncHandler(async (req, res) => {
  const userId = req.body.userId
  const recipeId = req.params.recipeId

  await findRecipe(recipeId)

  const response = await create({ userId, recipeId })
  const like = response.rows[0]

  res.status(201).json({
    message: 'successfuly created new like',
    like
  })
})

exports.getAllLikes = asyncHandler(async (req, res) => {
  const response = await findAll()
  const likes = response.rows
  res.status(200).json(likes)
})

exports.getLikeByRecipe = asyncHandler(async (req, res) => {
  const recipeId = req.params.recipeId
  await findRecipe(recipeId)

  const response = await findByRecipeId(recipeId)
  const likes = response.rows

  res.status(200).json(likes)
})

exports.getLikeByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId
  await findUser(userId)

  const response = await findByUserId(userId)
  const likes = response.rows

  res.status(200).json(likes)
})

exports.deleteLike = asyncHandler(async (req, res) => {
  const likedId = req.params.likedId
  await findById(likedId)
  await destroy(likedId)

  res.status(200).json({
    message: `Successfuly deleted like with an id of ${likedId}`
  })
})
