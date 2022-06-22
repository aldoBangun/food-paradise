const router = require('express').Router()
const { 
   getRecipes,
   getRecipeById,
   getLatestRecipe,
   createRecipe,
   updateRecipe,
   deleteRecipe
} = require('../controllers/recipes')


router.route('/').get(getRecipes).post(createRecipe)
router.route('/latest').get(getLatestRecipe)
router.route('/:id').get(getRecipeById).patch(updateRecipe).delete(deleteRecipe)


module.exports = router