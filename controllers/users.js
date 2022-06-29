const asyncHandler = require('../middleware/asyncHandler')
const { update, destroy, findAll, findById } = require('../models/users')
const deleteFiles = require('../utils/deleteFiles')
const getStatic = require('../utils/getStatic')

const getUsers = asyncHandler(async(req, res) => {
   const users = await findAll()

   res.status(200).json({
      data: getStatic(users.rows),
      length: users.rowCount
   })
})


const getUser = asyncHandler(async(req, res) => {
   const user = await findById(req.params.id)

   res.status(200).json({
      data: getStatic(user.rows)[0],
      length: user.rowCount
   })
})


const updateUser = asyncHandler(async(req, res) => {
   const { id } = req.params
   const data = await findById(id)
   const user = data.rows[0]
   const avatar = `/static/images/${req.file.filename}`

   if(user.avatar) {
      const filename = user.avatar.split('/')[3]
      await deleteFiles('images', [filename])
   }

   await update({ id, avatar, ...req.body })

   res.status(200).json({
      message: `Successfully updated user with an id of ${user.user_id}`
   })
})


const deleteUser = asyncHandler(async(req, res) => {
   const data = await findById(req.params.id)
   const user = data.rows[0]

   if(user.avatar) {
      const filename = user.avatar.split('/')[3]
      await deleteFiles('images', [filename])
   }

   await destroy(req.params.id)

   res.status(200).json({
      message: `Successfully deleted user with an id of ${user.user_id}`
   })
})


module.exports = { getUsers, getUser, updateUser, deleteUser }