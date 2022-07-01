const router = require('express').Router()
const { upload } = require('../middleware/fileUploads')
const {
  getRecipes,
  getRecipeById,
  getLatestRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipes')
const { getCommentById, getCommentByRecipe, createComment, updateComment, deleteComment } = require('../controllers/comments')
const { tokenVerify } = require('../middleware/jwt')
const uploadFields = [{ name: 'photo' }, { name: 'videos', maxCount: 4 }]

router.route('/')
  .get(getRecipes)
  .post(tokenVerify, upload.fields(uploadFields), createRecipe)

router.route('/latest').get(getLatestRecipe)

router.route('/:id')
  .get(tokenVerify, getRecipeById)
  .patch(tokenVerify, upload.fields(uploadFields), updateRecipe)
  .delete(tokenVerify, deleteRecipe)

router.route('/:id/comments').get(getCommentByRecipe).post(tokenVerify, createComment)

router.route('/:id/comments/:commentId')
  .get(getCommentById)
  .patch(tokenVerify, updateComment)
  .delete(tokenVerify, deleteComment)

module.exports = router
