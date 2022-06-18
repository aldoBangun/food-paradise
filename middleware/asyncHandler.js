const asyncHandler = callback => (req, res, next) => {
   return Promise.resolve(callback(req, res, next)).catch(next)
}

module.exports = asyncHandler