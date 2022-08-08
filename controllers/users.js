const asyncHandler = require('../middleware/asyncHandler')
const { update, destroy, findAll, findById } = require('../models/users')
const cloudinary = require('../config/cloudinary')

const getUsers = asyncHandler(async (req, res) => {
  const users = await findAll()

  res.status(200).json({
    data: users.rows,
    length: users.rowCount
  })
})

const getUser = asyncHandler(async (req, res) => {
  const user = await findById(req.params.id)

  res.status(200).json({
    data: user.rows[0],
    length: user.rowCount
  })
})

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const data = await findById(id)
  const user = data.rows[0]
  const avatar = req?.file?.path

  const newUser = { id, ...req.body }
  
  if(avatar) {
    const uploadAvatar = await cloudinary.uploader.upload(avatar, {
      upload_preset: 'food-paradise',
      folder: 'images'
    })    

    const avatarUrl = uploadAvatar.secure_url
    newUser.avatar = avatarUrl
  }

  await update(newUser)

  res.status(200).json({
    message: `Successfully updated user with an id of ${user.user_id}`
  })
})

const deleteUser = asyncHandler(async (req, res) => {
  const data = await findById(req.params.id)
  const user = data.rows[0]

  await destroy(req.params.id)

  res.status(200).json({
    message: `Successfully deleted user with an id of ${user.user_id}`
  })
})

module.exports = { getUsers, getUser, updateUser, deleteUser }
