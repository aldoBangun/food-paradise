const router = require('express').Router()
const { tokenVerify } = require('../middleware/jwt')
const { getAllLikes, deleteLike } = require('../controllers/likeRecipe')

router.route('/').get(getAllLikes)
router.route('/:likedId').delete(tokenVerify, deleteLike)

module.exports = router
