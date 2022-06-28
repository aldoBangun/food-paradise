const bcrypt = require('bcrypt')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('./asyncHandler')
const saltRounds = 10


const passwordHash = asyncHandler((req, res, next) => {
   bcrypt.hash(req.body.password, saltRounds, (err, result) => {
      if(err) throw new ErrorResponse(err.message, 500)   
      req.body.password = result
      next()
   })
})

const passwordCompare = asyncHandler((req, res, next) => {
   bcrypt.compare(req.body.password, req.user.password, (err, match) => {
      if(err) throw new ErrorResponse(err.message, 500)
      if(match) return next()
      next(new ErrorResponse('Invalid password', 401))
   })
})


module.exports = { passwordHash, passwordCompare }

