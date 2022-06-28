const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')


const tokenSign = asyncHandler(async(req, res) => {
   const { payload } = req
   
   jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' }, (err, token) => {
      if(err) throw new ErrorResponse(err.message, 500)
      res.status(200).json({ token })
   })
})

const tokenVerify = asyncHandler(async(req, res, next) => {
   const bearerToken = req.headers.authorization
   if(!bearerToken) throw new ErrorResponse("No authorization token", 401)
   
   const token = bearerToken.split(' ')[1]

   jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err) => {
      if(err) throw new ErrorResponse(err.message, 401)
      next()
   })
})


module.exports = { tokenSign, tokenVerify }