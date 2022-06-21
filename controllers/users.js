const asyncHandler = require('../middleware/asyncHandler')
const { create, update, destroy, getAllUser, getUserById } = require('../models/users')


const getUsers = asyncHandler(async(req, res) => {
   const users = await getAllUser()

   res.status(200).json({
      data: users.rows,
      length: users.rowCount
   })
})


const getUser = asyncHandler(async(req, res) => {
   const user = await getUserById(req.params.id)

   res.status(200).json({
      data: user.rows,
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
   const { name, email, password, phone, photo } = req.body
   const data = await getUserById(id)
   const user = data.rows[0]

   await update({ id, name, email, password, phone, photo })

   res.status(200).json({
      message: `Successfully updated user with an id of ${user.id}`,
      data: { id, name, email }
   })
})


const deleteUser = asyncHandler(async(req, res) => {
   const data = await getUserById(req.params.id)
   console.log(data)
   const user = data.rows[0]

   await destroy(req.params.id)

   res.status(200).json({
      message: `Successfully deleted user with an id of ${user.id}`
   })
})


module.exports = { getUsers, getUser, register, updateUser, deleteUser }