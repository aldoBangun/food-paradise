const router = require('express').Router()
const { getUsers, getUser, addUser, updateUser, deleteUser } = require('../controllers/users')

router.route('/').get(getUsers).post(addUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router