const asyncHandler = require('../middleware/asyncHandler')
const { create, update, destroy, findAll, findById } = require('../models/users')
const deleteFiles = require('../utils/deleteFiles')


const getUsers = asyncHandler(async(req, res) => {
   const users = await findAll()

   res.status(200).json({
      data: users.rows,
      length: users.rowCount
   })
})


const getUser = asyncHandler(async(req, res) => {
   const user = await findById(req.params.id)

   res.status(200).json({
      data: user.rows[0],
      length: user.rowCount
   })
})


const register = asyncHandler(async(req, res) => {
   const { name, email, password, phone } = req.body
   const user = await create({ name, email, password, phone })

   res.status(201).json({
      message: "Successfully registered new user",
      data: { id: user.id, name, email }
   })
})


const updateUser = asyncHandler(async(req, res) => {
   const { id } = req.params
   const data = await findById(id)
   const user = data.rows[0]
   const photo = `${process.env.BASE_URL}/static/images/${req.file.filename}`

   if(user.photo) {
      const filename = user.photo.split('/')[5]
      await deleteFiles('images', [filename])
   }

   await update({ id, photo, ...req.body })

   res.status(200).json({
      message: `Successfully updated user with an id of ${user.user_id}`
   })
})


const deleteUser = asyncHandler(async(req, res) => {
   const data = await findById(req.params.id)
   console.log(data)
   const user = data.rows[0]

   if(user.photo) {
      const filename = user.photo.split('/')[5]
      await deleteFiles('images', [filename])
   }

   await destroy(req.params.id)

   res.status(200).json({
      message: `Successfully deleted user with an id of ${user.user_id}`
   })
})


module.exports = { getUsers, getUser, register, updateUser, deleteUser }