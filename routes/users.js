const router = require('express').Router()
const { getUsers, getUser, register, updateUser, deleteUser } = require('../controllers/users')

router.route('/').get(getUsers).post(register)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router