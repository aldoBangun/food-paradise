const ErrorResponse = require('../utils/errorResponse')


const errorHandler = (err, req, res, next) => {
   let error = err
   
   console.log(error)

   if(error.status === 404) {
      error = new ErrorResponse(`${err.message || 'Resource Not Found'}`, 404)
   }

   if(error.code === '42P01') {
      error = new ErrorResponse('Database Error', 500)
   }

   if(error.code === '42703') {
      error = new ErrorResponse('Database Error: Insert data failed', 500)
   }

   if(error.code === '23505') {
      error = new ErrorResponse(error.detail, 400)
   }

   res.status(error.status || 500).json({
      message: error.message || "Internal Server Error"
   })
}


module.exports = errorHandler