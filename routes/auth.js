const router = require('express').Router()
const { passwordHash, passwordCompare } = require('../middleware/bcrypt')
const { register, login } = require('../controllers/auth')
const { tokenSign } = require('../middleware/jwt')

router.route('/register').post(passwordHash, register)
router.route('/login').post(login, passwordCompare, tokenSign)

module.exports = router