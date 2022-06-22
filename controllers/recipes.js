const asyncHandler = require('../middleware/asyncHandler')
const { findAll, create, findById, findByUsername, findLatest, update, destroy } = require('../models/recipes')
const moment = require('moment')


const getRecipes = asyncHandler(async(req, res) => {
   let data = []
   
   if(req.query.name) {
      data = await findByUsername(req.query.name)
   } else {
      data = await findAll()
   }

   res.status(200).json({
      data: data.rows,
      length: data.rowCount
   })
})

const getRecipeById = asyncHandler(async(req, res) => {
   const data = await findById(req.params.id)

   res.status(200).json({
      data: data.rows[0]
   })

})

const getLatestRecipe = asyncHandler(async(req, res) => {
   const data = await findLatest()
   
   res.status(200).json({
      data: data.rows[0],
   })
})

const createRecipe = asyncHandler(async(req, res) => {
   const recipe = req.body

   recipe.created_at = moment().format()
   await create(recipe)

   res.status(201).json({
      message: "Successfully created new recipe",
   })
})

const updateRecipe = asyncHandler(async(req, res) => {
   const { id } = req.params
   const data = await findById(id)
   const recipe = data.rows[0]

   await update({ id, ...req.body })
   
   res.status(200).json({
      message: `Succesfully updated recipe with an id of ${recipe.recipe_id}`
   })
})

const deleteRecipe = asyncHandler(async(req, res) => {
   const { id } = req.params
   const data = await findById(id)
   const recipe = data.rows[0]

   await destroy(id)

   res.status(200).json({
      message: `Successfully deleted recipe with an id of ${recipe.recipe_id}`
   })
})


module.exports = {
   getRecipes,
   getRecipeById,
   getLatestRecipe,
   createRecipe,
   updateRecipe,
   deleteRecipe
}