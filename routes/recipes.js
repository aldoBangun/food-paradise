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


router.route('/')
   .get(getRecipes)
   .post(upload.fields([{name: 'photo'}, {name: 'videos', maxCount: 4}]),createRecipe)

router.route('/latest').get(getLatestRecipe)

router.route('/:id').get(getRecipeById).patch(updateRecipe).delete(deleteRecipe)


module.exports = router