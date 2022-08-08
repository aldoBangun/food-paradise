const moment = require('moment')
const asyncHandler = require('../middleware/asyncHandler')
const { findAll, create, findById, findByUsername, findLatest, update, destroy, findByTitle, findByPage } = require('../models/recipes')
const ErrorResponse = require('../utils/ErrorResponse')
const getStatic = require('../utils/getStatic')
const cloudinary = require('../config/cloudinary')

const getRecipeByPage = async (req, res) => {
  const { limit, page } = req.query
  const recipes = await findAll()
  const totalPage = Math.ceil(recipes.rowCount / limit)
  const isValidInput = (page <= totalPage) && (+page > 0)

  if (!isValidInput) {
    throw new ErrorResponse('Page Not Found', 404)
  }

  const offset = (+page - 1) * +limit
  const data = await findByPage(limit, offset)
  const pageCount = `${page} of ${totalPage}`
  const totalData = recipes.rowCount

  res.status(200).json({
    data: data.rows,
    length: data.rowCount,
    page: pageCount,
    totalData
  })
}

const getRecipes = asyncHandler(async (req, res) => {
  let data = []

  if (req.query.page && req.query.limit) {
    await getRecipeByPage(req, res)
  }

  if (req.query.name) {
    data = await findByUsername(req.query.name)
  } else if (req.query.title) {
    data = await findByTitle(req.query.title)
  } else {
    data = await findAll()
  }

  console.log(data)

  res.status(200).json({
    data: data.rows,
    length: data.rowCount
  })
})

const getRecipeById = asyncHandler(async (req, res) => {
  const data = await findById(req.params.id)

  res.status(200).json({
    data: getStatic(data.rows)[0]
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
  })

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

  const recipe = { photo: photoUrl, videos: uploadVideos, ...req.body }
  recipe.createdAt = moment().format()

  await create(recipe)

  res.status(201).json({
    message: 'Successfully created new recipe'
  })
})

const updateRecipe = asyncHandler(async (req, res) => {
  const { id } = req.params
  const data = await findById(id)
  const recipe = data.rows[0]
  console.log(req)
  const photo = req?.files?.photo[0]?.path
  const videos = req?.files?.videos?.map((video) => {
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

  const newRecipe = {
    id,
    ...req.body
  }

  if(uploadVideos.length) {
    newRecipe.videos = uploadVideos
  }

  if(photo) {
    newRecipe.photo = photoUrl
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
