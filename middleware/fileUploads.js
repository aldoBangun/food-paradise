const multer = require('multer')
const path = require('path')

const imageStorage = multer.diskStorage({
   destination: (req, file, callback) => {
      callback(null, path.join(__dirname, '../public/images'))
   },
   filename: (req, file, callback) => {
      const validName = file.originalname.split(' ').join('-')
      const randomNumber = Math.round(Math.random() * 1e9)
      const uniqueName = `${Date.now()}-${randomNumber}-${validName}`

      callback(null, uniqueName)
   }
})

const uploadImage = multer({
   storage: imageStorage,
   fileFilter: (req, file, callback) => {
      const ONE_MEGA_BYTE = 1024 * 1024
      const isValidMimeType = file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"
      const isValidSize = file.size <= ONE_MEGA_BYTE

      if(!isValidMimeType) {
         callback(new Error('Only accept .png, .jpg, .jpeg image format'), false)
      }

      if(!isValidSize) {
         callback(new Error('Image cannot be more than 1 MB'), false)
      }
   }
})


module.exports = { uploadImage }