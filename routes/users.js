const router = require('express').Router()
const { getUsers, getUser, register, updateUser, deleteUser } = require('../controllers/users')
const { upload } = require('../middleware/fileUploads')

router.route('/').get(getUsers).post(register)
router.route('/:id')
   .get(getUser)
   .patch(upload.single('photo'), updateUser)
   .delete(deleteUser)

module.exports = router