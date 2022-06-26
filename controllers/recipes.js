const moment = require('moment')
const asyncHandler = require('../middleware/asyncHandler')
const { findAll, create, findById, findByUsername, findLatest, update, destroy } = require('../models/recipes')


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
   const maxResult = 5

   if(data.rowCount > maxResult) {
      data.rows = maxResult
   }
   
   res.status(200).json({
      data: data.rows,
   })
})

const createRecipe = asyncHandler(async(req, res) => {
   const photo = `${process.env.BASE_URL}/static/images/${req.files.photo.filename}`
   const videos = req.files.videos.map(video => {
      return `${process.env.BASE_URL}/static/videos/${video.filename}`
   })

   const recipe = { photo, videos, ...req.body }
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