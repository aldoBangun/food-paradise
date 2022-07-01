const router = require('express').Router()
const { getComments } = require('../controllers/comments')

router.route('/').get(getComments)

module.exports = router
