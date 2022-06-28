const asyncHandler = require('../middleware/asyncHandler')
const { create, findByEmail } = require('../models/users')


const register = asyncHandler(async(req, res) => {
   const { name, email, password, phone } = req.body
   await create({ name, email, password, phone })

   res.status(201).json({
      message: "Successfully registered new user",
   })
})

const login = asyncHandler(async(req, res, next) => {
   const { email } = req.body
   const data = await findByEmail(email)
   const user = data.rows[0]
   
   req.user = user
   req.payload = {
      userId: user.user_id,
      name: user.name,
      email: user.email
   }

   next()
})


module.exports = { register, login }