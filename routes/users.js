const router = require('express').Router()
const { getUsers, getUser, updateUser, deleteUser, getUserRecipes } = require('../controllers/users')
const { upload } = require('../middleware/fileUploads')
const { tokenVerify } = require('../middleware/jwt')
const { passwordHash } = require('../middleware/bcrypt')
const { getLikeByUser } = require('../controllers/likeRecipe')

router.route('/').get(getUsers)

router.route('/:id')
  .get(getUser)
  .patch(tokenVerify, upload.single('avatar'), passwordHash, updateUser)
  .delete(tokenVerify, deleteUser)

router.route('/:id/recipes')
  .get(getUserRecipes)

router.route('/:id/likes')
  .get(getLikeByUser)

module.exports = router
