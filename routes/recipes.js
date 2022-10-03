const router = require('express').Router()
const { upload } = require('../middleware/fileUploads')
const { tokenVerify } = require('../middleware/jwt')
const {
  getRecipes,
  getRecipeById,
  getLatestRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
} = require('../controllers/recipes')
const {
  getCommentById,
  getCommentByRecipe,
  createComment,
  updateComment,
  deleteComment
} = require('../controllers/comments')
const { getLikeByRecipe, createLike, deleteLike } = require('../controllers/likeRecipe')
const uploadFields = [{ name: 'photo' }, { name: 'videos', maxCount: 4 }]

router.route('/')
  .get(getRecipes)
  .post(tokenVerify, upload.fields(uploadFields), createRecipe)

router.route('/latest').get(getLatestRecipe)

router.route('/:id')
  .get(getRecipeById)
  .patch(tokenVerify, upload.fields(uploadFields), updateRecipe)
  .delete(tokenVerify, deleteRecipe)

router.route('/:id/comments')
  .get(getCommentByRecipe)
  .post(tokenVerify, createComment)

router.route('/:id/comments/:commentId')
  .get(getCommentById)
  .patch(tokenVerify, updateComment)
  .delete(tokenVerify, deleteComment)

router.route('/:id/likes')
  .get(getLikeByRecipe)
  .post(tokenVerify, createLike)

router.route('/:id/likes/:likeId')
  .delete(tokenVerify, deleteLike)

module.exports = router
