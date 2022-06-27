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


router.route('/')
   .get(getRecipes)
   .post(upload.fields([{name: 'photo'}, {name: 'videos', maxCount: 4}]),createRecipe)

router.route('/latest').get(getLatestRecipe)

router.route('/:id').get(getRecipeById).patch(updateRecipe).delete(deleteRecipe)

router.route('/:id/comments').get(getCommentByRecipe).post(createComment)

router.route('/:id/comments/:commentId').get(getCommentById).patch(updateComment).delete(deleteComment)


module.exports = router