const moment = require('moment')
const asyncHandler = require('../middleware/asyncHandler')
const { findAll, create, findById, findByUsername, findLatest, update, destroy, findByTitle, findByPage, findByCategory } = require('../models/recipes')
const ErrorResponse = require('../utils/ErrorResponse')
const cloudinary = require('../config/cloudinary')

const getRecipeByPage = async (req, res) => {
  const { limit, page } = req.query
  const pageInt = +page
  const limitInt = +limit

  if (!pageInt && !limitInt) throw new ErrorResponse('Bad Request', 400)

  const recipes = await findAll()
  const totalPages = Math.ceil(recipes.rowCount / limitInt)
  const isValidInput = (pageInt <= totalPages) && (pageInt > 0)

  if (!isValidInput) throw new ErrorResponse('Data Not Found', 404)

  const offset = (pageInt - 1) * limitInt
  const data = await findByPage(limitInt, offset)
  const totalData = recipes.rowCount

  res.status(200).json({
    data: data.rows,
    length: data.rowCount,
    page: pageInt,
    totalPages,
    totalData
  })
}

const getRecipeByTitle = async (req, res) => {
  let data = []

  const allowedSortBy = ['title', 'created_at']
  const allowedSortType = ['ASC', 'DESC']

  if (req.query.sort && req.query.order) {
    const validSort = allowedSortBy.indexOf(req.query.sort) !== -1
    const validOrder = allowedSortType.indexOf(req.query.order) !== -1

    if (validSort && validOrder) {
      data = await findByTitle(req.query.title, req.query.sort, req.query.order)
    } else {
      data = await findByTitle(req.query.title)
    }
  } else {
    data = await findByTitle(req.query.title)
  }

  res.status(200).json({
    data: data.rows,
    length: data.rowCount
  })
}

const getRecipes = asyncHandler(async (req, res) => {
  let data = []

  if (req.query.page && req.query.limit) {
    await getRecipeByPage(req, res)
    return
  }

  if (req.query.name) {
    data = await findByUsername(req.query.name)
  } else if (req.query.title) {
    await getRecipeByTitle(req, res)
    return
  } else if (req.query.category) {
    data = await findByCategory(req.query.category)
  } else {
    data = await findAll()
  }

  res.status(200).json({
    data: data.rows,
    length: data.rowCount
  })
})

const getRecipeById = asyncHandler(async (req, res) => {
  const data = await findById(req.params.id)

  res.status(200).json({
    data: data.rows[0]
  })
})

const getLatestRecipe = asyncHandler(async (req, res) => {
  const maxResult = 5
  const data = await findLatest(maxResult)

  res.status(200).json({
    data: data.rows,
    length: data.rowCount
  })
})

const createRecipe = asyncHandler(async (req, res) => {
  req.body.userId = parseInt(req?.body?.user_id)
  const photo = req?.files?.photo[0]?.path
  const videos = req?.files?.videos?.map(video => {
    return video.path
  }) || []

  const uploadPhoto = await cloudinary.uploader.upload(photo, {
    upload_preset: 'food-paradise',
    folder: 'images'
  })

  const photoUrl = uploadPhoto.secure_url

  const uploadVideos = []

  for (let i = 0; i < videos?.length; i++) {
    const result = await cloudinary.uploader.upload(videos[i], {
      upload_preset: 'food-paradise',
      folder: 'videos',
      chunk_size: 33337294,
      resource_type: 'video'
    })

    uploadVideos.push(result.secure_url)
  }

  const recipe = {
    userId: req.body.user_id,
    title: req.body.title,
    ingredients: JSON.parse(req.body.ingredients),
    variant: req.body.variant,
    category: req.body.category,
    restaurant: req.body.restaurant,
    photo: photoUrl,
    videos: uploadVideos,
    createdAt: moment().format()
  }

  await create(recipe)

  res.status(201).json({
    message: 'Successfully created new recipe'
  })
})

const updateRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params
  const data = await findById(id)
  const recipe = data.rows[0]
  const photo = req?.files?.photo[0]?.path
  const videos = req?.files?.videos?.map((video) => {
    return video.path
  }) || []

  const newRecipe = { id, ...req.body }

  if (photo) {
    const uploadPhoto = await cloudinary.uploader.upload(photo, {
      upload_preset: 'food-paradise',
      folder: 'images'
    })

    const photoUrl = uploadPhoto.secure_url
    newRecipe.photo = photoUrl
  }

  if (videos.length) {
    const uploadVideos = []

    for (let i = 0; i < videos?.length; i++) {
      const result = await cloudinary.uploader.upload(videos[i], {
        upload_preset: 'food-paradise',
        folder: 'videos',
        chunk_size: 33337294,
        resource_type: 'video'
      })
      uploadVideos.push(result.secure_url)
    }

    newRecipe.videos = uploadVideos
  }

  await update(newRecipe)

  res.status(200).json({
    message: `Succesfully updated recipe with an id of ${recipe.recipe_id}`
  })
})

const deleteRecipe = asyncHandler(async (req, res) => {
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
