const router = require('express').Router()
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/users')
const { upload } = require('../middleware/fileUploads')
const { tokenVerify } = require('../middleware/jwt')

router.route('/').get(getUsers)
router.route('/:id')
   .get(tokenVerify, getUser)
   .patch(tokenVerify, upload.single('photo'), updateUser)
   .delete(tokenVerify, deleteUser)

module.exports = router