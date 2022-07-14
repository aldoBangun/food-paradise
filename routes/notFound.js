const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse.js')

const notFound = asyncHandler(() => {
  throw new ErrorResponse('Request Not Found', 404)
})

module.exports = notFound
