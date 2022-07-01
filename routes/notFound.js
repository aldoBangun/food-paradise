const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

const notFound = asyncHandler(() => {
  throw new ErrorResponse('Request Not Found', 404)
})

module.exports = notFound
