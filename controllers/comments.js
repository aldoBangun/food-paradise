const moment = require('moment')
const asyncHandler = require('../middleware/asyncHandler')
const { create, update, destroy, findById, findByRecipeId, findAll } = require('../models/comments')
const recipeModel = require('../models/recipes')

const getComments = asyncHandler(async (req, res) => {
  const data = await findAll()

  res.status(200).json({
    data: data.rows,
    length: data.rowCount
  })
})

const getCommentById = asyncHandler(async (req, res) => {
  const { id, commentId } = req.params

  await recipeModel.findById(id)

  const data = await findById(commentId)

  res.status(200).json({
    data: data.rows[0]
  })
})

const getCommentByRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params
  const data = await findByRecipeId(id)

  res.status(200).json({
    data: data.rows,
    length: data.rowCount
  })
})

const createComment = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { message } = req.body
  const userId = req.body.user_id
  const currentTime = moment().format()
  const comment = {
    message,
    userId,
    createdAt: currentTime,
    recipeId: id
  }

  const response = await create(comment)

  res.status(201).json({
    message: 'Successfully create a new comment',
    comment: response.rows[0]
  })
})

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params

  await findById(commentId)

  const newComment = {
    id: commentId,
    message: req.body.message
  }

  await update(newComment)

  res.status(200).json({
    message: `Successfully updated a comment with an id of ${commentId}`
  })
})

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params

  await findById(commentId)
  await destroy(commentId)

  res.status(200).json({
    message: `Successfully deleted a comment with an id of ${commentId}`
  })
})

module.exports = { getCommentById, getCommentByRecipe, createComment, updateComment, deleteComment, getComments }
