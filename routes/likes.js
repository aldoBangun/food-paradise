const router = require('express').Router()
const { getAllLikes, deleteLike } = require('../controllers/likeRecipe')

router.route('/').get(getAllLikes)
router.route('/:likedId').delete(deleteLike)

module.exports = router
